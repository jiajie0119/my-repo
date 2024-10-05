from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from sentiment_analysis import analyze_sentiment # Import the sentiment analysis function

def scrape_facebook_reviews(url):
    # Initialize the Chrome WebDriver
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--start-maximized")
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        # Navigate to the Facebook page
        driver.get(url)
        time.sleep(5)  # Wait for the page to load

        reviews = []
        seen_reviews = set()  # Use a set to track unique reviews

        # Scroll down to load more reviews
        previous_height = driver.execute_script("return document.body.scrollHeight")
        for i in range(20):  # Adjust the number of scrolls if needed
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            print(f"Scrolling... {i+1}")
            time.sleep(3)  # Wait for new content to load

            # Extract review elements using multiple selectors
            review_selectors = [
                "span.html-span.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1hl2dhg.x16tdsg8.x1vvkbs.xzsf02u.xngnso2.xo1l8bm.x1qb5hxa",
                "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xo1l8bm.xzsf02u.x1yc453h"
            ]
            
            for selector in review_selectors:
                review_elements = driver.find_elements(By.CSS_SELECTOR, selector)
                print(f"Found {len(review_elements)} review elements with selector: {selector}.")
                
                for element in review_elements:
                    try:
                        review_text = element.text
                        if review_text and review_text not in seen_reviews and len(review_text) > 20:
                            seen_reviews.add(review_text)
                            reviews.append(review_text)  # Store review text directly
                            print(f"Extracted review: {review_text}")
                    except Exception as e:
                        print(f"Error extracting review: {e}")

            # Check if we have reached the end of the page
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == previous_height:
                break
            previous_height = new_height

        return reviews

    finally:
        driver.quit()

def main():
    url = ""
    reviews = scrape_facebook_reviews(url)
    
    if reviews:
        # Pass the reviews directly to the sentiment analysis
        return analyze_sentiment(reviews)
    else:
        # If no reviews are found, return default values
        return 0, 0, 0, 0.0, 0.0, 0.0

if __name__ == "__main__":
    main()