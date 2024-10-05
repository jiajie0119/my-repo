from nltk.sentiment import SentimentIntensityAnalyzer
from category import categorize_reviews
from collections import Counter

sia = SentimentIntensityAnalyzer()

def analyze_sentiment(reviews):
    # Initialize counters for sentiment types
    positive_count = 0
    neutral_count = 0
    negative_count = 0

    categories = categorize_reviews(reviews)
    
    if reviews:
        # Analyze each review
        for review in reviews:
            sentiment = sia.polarity_scores(review)
            if sentiment['compound'] >= 0.05:
                positive_count += 1
            elif sentiment['compound'] <= -0.05:
                negative_count += 1
            else:
                neutral_count += 1

    # Calculate total count
    total_count = positive_count + neutral_count + negative_count

    # Avoid division by zero
    if total_count == 0:
        positive_index = neutral_index = negative_index = 0.00
    else:
        # Calculate proportions
        positive_proportion = positive_count / total_count
        neutral_proportion = neutral_count / total_count
        negative_proportion = negative_count / total_count

        # Convert proportions to scale of 1 to 10 and round to two decimal places
        positive_index = round(positive_proportion * 10, 2)
        neutral_index = round(neutral_proportion * 10, 2)
        negative_index = round(negative_proportion * 10, 2)
        
        # Calculate the most frequent category
        most_frequent_category = get_most_frequent_category(categories)

        # Calculate the top 5 categories
        top_five_categories = get_top_five_categories(categories)
        
    return positive_count, neutral_count, negative_count, positive_index, neutral_index, negative_index, categories, most_frequent_category, top_five_categories

def get_most_frequent_category(categories):
    # Remove 'unknown' category if present
    categories_without_unknown = {k: v for k, v in categories.items() if k != 'unknown'}
    
    if not categories_without_unknown:
        return None
    
    # Count the number of reviews in each category
    category_counts = {category: len(reviews) for category, reviews in categories_without_unknown.items()}
    
    # Find the category with the most reviews
    most_frequent_category = max(category_counts, key=category_counts.get)
    
    return most_frequent_category

def get_top_five_categories(categories):
    # Remove 'unknown' category if present
    categories_without_unknown = {k: v for k, v in categories.items() if k != 'unknown'}

    # Count the number of reviews in each category
    category_counts = {category: len(reviews) for category, reviews in categories_without_unknown.items()}

    # Get the top five categories by count
    top_five_categories = sorted(category_counts.items(), key=lambda x: x[1], reverse=True)[:5]

    return top_five_categories