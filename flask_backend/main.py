import re
import os
from flask import Flask, request, jsonify
import google.generativeai as genai

# Configure the generative AI client with your API key
genai.configure(api_key="AIzaSyCML0GPDaTfToi18eHdyntRnV1QsTO_bek")

app = Flask(__name__)

def identify_transaction(message):
    """Identifies transaction details using the Gemini API via google-generativeai."""
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        prompt = """
        Extract transaction details from the following message and format them exactly as shown:
        ** Account: XXXXXXXXXXXX
        ** Amount: 123.45
        ** Date: 23Oct2024
        ** Reference: 123456

        Note: For the reference number, use any transaction ID, FT number, or reference number.
        For the account, include any bank account number mentioned.
        For amount, include any debited amount mentioned.
        
        Message: "{}"
        """.format(message)
        
        response = model.generate_content(prompt)
        generated_text = response.text
        print("Generated text:", generated_text)  # Debug logging
        
        # First try to extract directly from the message
        transaction_details = extract_transaction_details(message)
        
        # If direct extraction fails, try from the AI-generated response
        if not transaction_details:
            transaction_details = extract_transaction_details(generated_text)
            
        if not transaction_details:
            raise ValueError("No transaction details found in the response")
        return transaction_details
    except Exception as e:
        print(f"Error processing transaction: {str(e)}")
        return None

def extract_transaction_details(text):
    """Extracts transaction details from the text using more flexible regex patterns."""
    patterns = {
        'account_number': r'(?i)(?:\*\*\s*)?(?:Account:?\s*|A\/C\s+X|XX|from\s+(?:HDFC\s+Bank\s+)?XX)([X\d]+)',
        'debited_amount': r'(?i)(?:\*\*\s*)?(?:Amount:?\s*|INR\s*|debited\s+by\s*)([\d,]+\.?\d*)',
        'transaction_date': r'(?i)(?:\*\*\s*)?(?:Date:?\s*|on\s+date\s+|on\s+)(\d{1,2}[-\s]*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[-\s]*\d{2,4})',
        'reference_number': r'(?i)(?:\*\*\s*)?(?:Reference:?\s*|Refno\s*|FT\s*-\s*Dr\s*-\s*)([X\d]+)'
    }
    
    transaction_details = {}
    
    for key, pattern in patterns.items():
        match = re.search(pattern, text)
        if match:
            value = match.group(1).strip()
            # Clean up amount format
            if key == 'debited_amount':
                value = value.replace(',', '')
            # Clean up date format
            if key == 'transaction_date':
                value = standardize_date(value)
            transaction_details[key] = value
            print(f"Found {key}: {value}")  # Debug logging
    
    return transaction_details if transaction_details else None

def standardize_date(date_str):
    """Standardize date format to DDMonYYYY"""
    # Remove any hyphens or spaces
    date_str = re.sub(r'[-\s]', '', date_str)
    
    # Extract components using regex
    match = re.match(r'(\d{1,2})(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*(\d{2,4})', date_str, re.I)
    
    if match:
        day, month, year = match.groups()
        # Pad day with leading zero if necessary
        day = day.zfill(2)
        # Convert month to title case
        month = month.title()
        # Convert 2-digit year to 4-digit year
        if len(year) == 2:
            year = '20' + year
        
        return f"{day}{month}{year}"
    return date_str

@app.route('/api/identifydetails', methods=['POST'])
def identify():
    """Endpoint to identify transaction details from a message."""
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required in request body'}), 400

        message = data['message']
        if not isinstance(message, str) or not message.strip():
            return jsonify({'error': 'Message must be a non-empty string'}), 400

        transaction_details = identify_transaction(message)
        if not transaction_details:
            return jsonify({'error': 'Unable to extract transaction details from the message'}), 422

        return jsonify({
            'status': 'success',
            'data': transaction_details
        })

    except Exception as e:
        return jsonify({
            'error': f'Server error: {str(e)}',
            'status': 'error'
        }), 500

@app.errorhandler(500)
def handle_500_error(e):
    return jsonify({
        'error': 'Internal server error occurred',
        'status': 'error'
    }), 500

if __name__ == '__main__':
    app.run(debug=True)