from flask import Flask, render_template, request, redirect
from sentiment_analysis import analyze_sentiment  # Import the sentiment analysis function
from fbreview_crawler import scrape_facebook_reviews  # Import the scraping function
from nltk.sentiment import SentimentIntensityAnalyzer

# Initialize Flask app
app = Flask(__name__)

# Initialize SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/submit', methods=['POST'])
def submit():
    # Get the URL from the form
    url = request.form['url']

    # Scrape reviews from the provided Facebook URL
    reviews = scrape_facebook_reviews(url)
    
    # Perform sentiment analysis on the scraped reviews
    positive_count, neutral_count, negative_count, positive_index, neutral_index, negative_index = analyze_sentiment(reviews)
    
    # Prepare review data for the table
    review_data = [
        {"no": i + 1, "review": review, "sentiment": classify_sentiment(sia.polarity_scores(review)['compound'])}
        for i, review in enumerate(reviews)
    ]    
    
    # Render the index.html template with the sentiment analysis results
    return render_template('index.html', 
                           positive=positive_count, 
                           neutral=neutral_count, 
                           negative=negative_count, 
                           positive_index=positive_index, 
                           neutral_index=neutral_index, 
                           negative_index=negative_index,
                           reviews=review_data)

def classify_sentiment(compound_score):
    """Classify sentiment based on the compound score."""
    if compound_score >= 0.05:
        return "Positive"
    elif compound_score <= -0.05:
        return "Negative"
    else:
        return "Neutral"

@app.route('/index')
def index():
    # Render the index.html template for displaying results
    return render_template('index.html', 
                           positive=0, 
                           neutral=0, 
                           negative=0, 
                           positive_index=0.00, 
                           neutral_index=0.00, 
                           negative_index=0.00)
    
if __name__ == '__main__':
    app.run(debug=True)