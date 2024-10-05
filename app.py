from flask import Flask, render_template, request, redirect
from sentiment_analysis import analyze_sentiment  # Import the sentiment analysis function
from fbreview_crawler import scrape_facebook_reviews  # Import the scraping function
from nltk.sentiment import SentimentIntensityAnalyzer
from category import categorize_review

# Initialize Flask app
app = Flask(__name__)

# Initialize SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()

@app.route('/')
def signin_up():
    return render_template('signin_up.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact_us')
def contact_us():
    return render_template('contact_us.html')

@app.route('/user_profile')
def user_profile():
    return render_template('user_profile.html')

@app.route('/help')
def help():
    return render_template('help.html')

@app.route('/logout')
def logout():
    return redirect('/')

@app.route('/submit', methods=['POST'])
def submit():
    # Get the URL from the form
    url = request.form['url']

    # Scrape reviews from the provided Facebook URL
    reviews = scrape_facebook_reviews(url)
    
    # Perform sentiment analysis on the scraped reviews
    positive_count, neutral_count, negative_count, positive_index, neutral_index, negative_index, categories, most_frequent_category, top_five_categories = analyze_sentiment(reviews)
    
    # Prepare review data for the table
    review_data = [
        {
            "no": i + 1, 
            "review": review, 
            "sentiment": classify_sentiment(sia.polarity_scores(review)['compound']),
            "category": categorize_review(review)
        }
        for i, review in enumerate(reviews)
    ]    
    
    # Prepare data for charts
    chart_data = {
        'positive': positive_count,
        'neutral': neutral_count,
        'negative': negative_count,
        'categories': categories
    }
    
    # Define function to get the top five categories
    def get_top_five_categories(categories):
        # Remove 'unknown' category if present
        categories_without_unknown = {k: v for k, v in categories.items() if k != 'unknown'}

        # Count the number of reviews in each category
        category_counts = {category: len(reviews) for category, reviews in categories_without_unknown.items()}

        # Get the top five categories by count
        top_five_categories = sorted(category_counts.items(), key=lambda x: x[1], reverse=True)[:5]

        return top_five_categories

    # Call the function to get the top five categories
    top_five_categories = get_top_five_categories(categories)
    
    # Render the index.html template with the sentiment analysis results
    return render_template('index.html', 
                           positive=positive_count, 
                           neutral=neutral_count, 
                           negative=negative_count, 
                           positive_index=positive_index, 
                           neutral_index=neutral_index, 
                           negative_index=negative_index,
                           reviews=review_data,
                           categories=categories,
                           most_frequent_category=most_frequent_category,
                           top_five_categories=top_five_categories)

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
                           negative_index=0.00,
                           categories={})
    
if __name__ == '__main__':
    app.run(debug=True)