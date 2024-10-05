import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict

categories_keywords = {
    "services": [
        "service", "waiter", "waitress", "staff", "employee", "attitude", "rude", 
        "helpful", "friendly", "unfriendly", "manager", "support", "assistance",
        "prompt", "efficient", "slow", "professional", "dissatisfied", "satisfied",
        "delivery", "quick", "response", "courteous", "timely", "excellent", "poor",
        "complaint", "attentive", "neglectful", "responsive", "unresponsive",
        "accommodating", "unhelpful", "polite", "impolite", "patient", "impatient",
        "knowledgeable", "incompetent", "welcoming", "unwelcoming", "respectful",
        "disrespectful", "understanding", "misunderstanding", "communication", 
        "unfriendly",
        
    ],
    "food & beverage": [
        "food", "meal", "taste", "delicious", "disgusting", "coffee", "beer", "wine",
        "dish", "cuisine", "flavor", "fresh", "stale", "appetizer", "entree", "dessert",
        "presentation", "sauce", "seasoning", "tea", "lemon", "cream", "ice", "fish",
        "meat", "vegetarian", "vegan", "gluten-free", "organic", "portion", "overcooked",
        "undercooked", "spicy", "bland", "savory", "sweet", "bitter", "sour", "texture",
        "aroma", "menu", "ingredient", "recipe", "chef", "cook", "kitchen", "restaurant",
        "cafe", "bistro", "bar", "pub", "diner", "eatery", "foodie", "gourmet", "culinary",
        "drinks", "chicken", "drink", "lemon", "lychee", "beer", "yummy", "porridge", 
        "tasting", "dine"
    ],
    "environment": [
        "ambience", "environment", "atmosphere", "clean", "dirty", "vibe", "decor",
        "layout", "space", "setting", "noise", "quiet", "loud", "lighting", "dark",
        "bright", "comfortable", "uncomfortable", "crowded", "spacious", "cozy",
        "inviting", "aesthetic", "modern", "traditional", "classic", "trendy",
        "romantic", "family-friendly", "sophisticated", "casual", "formal", "relaxed",
        "tense", "welcoming", "unwelcoming", "temperature", "cold", "hot", "stuffy",
        "fresh air", "ventilation", "seating", "table", "chair", "booth", "bar stool",
        "outdoor", "indoor", "patio", "terrace", "view", "music", "playlist", "place"
    ],
    "education": [
        "education", "teacher", "professor", "instructor", "class", "course", "lecture",
        "seminar", "workshop", "learning", "study", "homework", "assignment", "exam",
        "test", "quiz", "grade", "score", "curriculum", "syllabus", "textbook", "material",
        "knowledge", "skills", "lesson", "tutorial", "training", "degree", "diploma",
        "certificate", "university", "college", "school", "academy", "institute",
        "campus", "classroom", "laboratory", "library", "research", "project", "thesis",
        "dissertation", "academic", "scholarly", "student", "pupil", "faculty", "staff",
        "administration", "program", "major", "minor", "specialization", "online learning",
        "distance education", "e-learning", "hands-on", "practical", "theoretical", "student",
        "study", "uni", "lecturers", "knowledge", "teaching", "programmes", "university", "studying",
        "learn", "campus", "students", "teaching", "universities", "foundation"
    ],
    "entertainment": [
        "movie", "film", "show", "theater", "cinema", "concert", "gig", "performance",
        "event", "festival", "carnival", "parade", "spectacle", "musical", "play",
        "drama", "comedy", "tragedy", "action", "thriller", "horror", "romance",
        "sci-fi", "documentary", "animation", "live", "recorded", "streaming",
        "broadcast", "actor", "actress", "director", "producer", "screenplay",
        "script", "plot", "story", "character", "dialogue", "scene", "set", "costume",
        "special effects", "CGI", "soundtrack", "score", "audience", "viewer",
        "spectator", "fan", "critic", "review", "rating", "box office", "ticket",
        "admission", "venue", "stage", "screen", "premiere", "opening night", "showtime"
    ],
    "travel": [
        "hotel", "motel", "inn", "resort", "hostel", "accommodation", "stay", "vacation",
        "holiday", "trip", "journey", "tour", "expedition", "adventure", "sightseeing",
        "destination", "location", "place", "spot", "attraction", "landmark", "monument",
        "museum", "gallery", "park", "beach", "mountain", "lake", "river", "forest",
        "countryside", "city", "town", "village", "rural", "urban", "exotic", "domestic",
        "international", "foreign", "local", "guide", "map", "itinerary", "schedule",
        "booking", "reservation", "check-in", "check-out", "luggage", "baggage",
        "suitcase", "backpack", "passport", "visa", "customs", "immigration", "flight",
        "train", "bus", "car rental", "cruise", "ferry", "transportation", "travel agent",
        "tourism", "souvenir", "memory", "experience", "culture", "tradition", "cuisine"
    ],
    "hotel": [
        "hotel", "motel", "inn", "resort", "hostel", "lodge", "guesthouse", "stay",
        "accommodation", "room", "suite", "penthouse", "lobby", "reception", "front desk",
        "concierge", "bellhop", "porter", "housekeeping", "maid service", "room service",
        "amenities", "facilities", "pool", "spa", "gym", "fitness center", "restaurant",
        "bar", "lounge", "conference room", "business center", "Wi-Fi", "internet",
        "TV", "cable", "mini-bar", "refrigerator", "air conditioning", "heating",
        "shower", "bathtub", "toilet", "bathroom", "bed", "mattress", "pillow", "linen",
        "towel", "toiletries", "hair dryer", "iron", "safe", "view", "balcony", "terrace",
        "parking", "valet", "shuttle", "airport transfer", "check-in", "check-out",
        "reservation", "booking", "cancellation", "refund", "rate", "price", "discount",
        "complimentary", "inclusive", "star rating", "luxury", "budget", "value"
    ],
    "health": [
        "doctor", "physician", "surgeon", "specialist", "nurse", "practitioner",
        "hospital", "clinic", "medical center", "emergency room", "ICU", "ward",
        "health", "wellness", "illness", "disease", "condition", "symptom", "diagnosis",
        "prognosis", "treatment", "therapy", "medication", "drug", "prescription",
        "over-the-counter", "surgery", "operation", "procedure", "checkup", "examination",
        "test", "scan", "X-ray", "MRI", "CT scan", "ultrasound", "lab work", "blood test",
        "urine test", "consultation", "appointment", "referral", "follow-up", "recovery",
        "rehabilitation", "physical therapy", "mental health", "psychology", "psychiatry",
        "counseling", "therapy", "alternative medicine", "holistic", "preventive care",
        "vaccination", "immunization", "hygiene", "sanitation", "nutrition", "diet",
        "exercise", "fitness", "healthcare", "insurance", "copay", "deductible"
    ],
    "shopping": [
        "shop", "store", "mall", "boutique", "outlet", "market", "bazaar", "retail",
        "purchase", "buy", "sell", "product", "item", "goods", "merchandise", "brand",
        "designer", "discount", "sale", "clearance", "bargain", "deal", "price",
        "cost", "expensive", "cheap", "affordable", "value", "quality", "customer",
        "client", "shopper", "consumer", "window shopping", "browsing", "trying on",
        "fitting room", "size", "color", "style", "fashion", "trend", "seasonal",
        "collection", "line", "accessories", "clothing", "shoes", "electronics",
        "appliances", "furniture", "home goods", "grocery", "supermarket", "department store",
        "specialty store", "online shopping", "e-commerce", "website", "cart", "checkout",
        "payment", "cash", "credit card", "debit card", "gift card", "loyalty program",
        "return policy", "exchange", "refund", "warranty", "customer service", "salespeople"
    ],
    "technology": [
        "app", "application", "software", "program", "code", "coding", "programming",
        "developer", "user", "interface", "UI", "UX", "device", "gadget", "hardware",
        "computer", "laptop", "desktop", "tablet", "smartphone", "mobile", "wearable",
        "smart home", "IoT", "internet", "web", "website", "browser", "search engine",
        "social media", "platform", "network", "cloud", "server", "database", "storage",
        "memory", "processor", "CPU", "GPU", "operating system", "OS", "update", "upgrade",
        "version", "bug", "glitch", "error", "troubleshooting", "tech support", "IT",
        "information technology", "artificial intelligence", "AI", "machine learning",
        "ML", "data science", "big data", "analytics", "virtual reality", "VR",
        "augmented reality", "AR", "encryption", "cybersecurity", "privacy", "backup",
        "sync", "wireless", "Bluetooth", "Wi-Fi", "5G", "broadband", "streaming"
    ],
    "transportation": [
        "bus", "train", "subway", "metro", "underground", "taxi", "cab", "ride-sharing",
        "Uber", "Lyft", "car", "automobile", "vehicle", "truck", "van", "motorcycle",
        "scooter", "bicycle", "bike", "e-bike", "aircraft", "airplane", "flight",
        "helicopter", "boat", "ship", "ferry", "cruise", "tram", "trolley", "cable car",
        "monorail", "high-speed rail", "bullet train", "transport", "transit", "commute",
        "travel", "journey", "trip", "ride", "drive", "route", "navigation", "GPS",
        "map", "schedule", "timetable", "delay", "cancellation", "traffic", "congestion",
        "rush hour", "peak hours", "off-peak", "fare", "ticket", "pass", "transfer",
        "station", "stop", "terminal", "airport", "seaport", "parking", "carpool",
        "public transportation", "private transportation", "mass transit", "freight",
        "logistics", "delivery", "shipping", "electric vehicle", "hybrid", "fuel efficiency"
    ],
    "beauty": [
        "salon", "spa", "beauty parlor", "barber shop", "hair", "hairstyle", "haircut",
        "coloring", "highlights", "dye", "bleach", "perm", "straightening", "styling",
        "blowout", "updo", "extensions", "wig", "makeup", "cosmetics", "foundation",
        "concealer", "powder", "blush", "bronzer", "highlighter", "eyeshadow", "eyeliner",
        "mascara", "lipstick", "lip gloss", "nail", "manicure", "pedicure", "polish",
        "gel", "acrylic", "facial", "skincare", "cleanse", "tone", "moisturize", "exfoliate",
        "mask", "serum", "cream", "lotion", "sunscreen", "anti-aging", "wrinkle", "acne",
        "treatment", "waxing", "threading", "plucking", "shaving", "laser hair removal",
        "massage", "aromatherapy", "reflexology", "body wrap", "scrub", "peel", "botox",
        "filler", "cosmetic surgery", "aesthetician", "beautician", "stylist", "colorist",
        "esthetician", "product", "brand", "organic", "natural", "cruelty-free", "vegan"
    ],
    "finance": [
        "money", "currency", "cash", "coin", "bill", "bank", "banking", "account",
        "savings", "checking", "deposit", "withdrawal", "transfer", "transaction",
        "balance", "credit", "debit", "loan", "mortgage", "interest", "rate", "APR",
        "APY", "investment", "stock", "bond", "mutual fund", "ETF", "portfolio",
        "diversification", "risk", "return", "dividend", "capital gain", "loss",
        "market", "bull market", "bear market", "exchange", "NYSE", "NASDAQ", "Dow Jones",
        "S&P 500", "index", "inflation", "deflation", "recession", "economic growth",
        "GDP", "fiscal policy", "monetary policy", "Federal Reserve", "central bank",
        "treasury", "budget", "deficit", "surplus", "tax", "income tax", "property tax",
        "sales tax", "deduction", "exemption", "credit score", "FICO score", "debt",
        "credit card", "charge", "overdraft", "bankruptcy", "asset", "liability",
        "equity", "hedge fund", "private equity", "venture capital", "IPO", "merger",
        "acquisition", "cryptocurrency", "blockchain", "fintech", "robo-advisor",
        "insurance", "premium", "claim", "policy", "annuity", "pension", "retirement",
        "401(k)", "IRA", "social security", "wealth management", "financial planning"
    ],
    "fashion": [
        "clothes", "outfit", "style", "fashion", "trend", "accessory", "collection", 
        "designer", "runway", "store", "fit", "fabric", "quality", "wardrobe", "chic",
        "couture", "ready-to-wear", "prêt-à-porter", "haute couture", "vintage", "retro",
        "contemporary", "classic", "avant-garde", "bohemian", "minimalist", "maximalist",
        "streetwear", "athleisure", "sustainable fashion", "fast fashion", "slow fashion",
        "ethical fashion", "upcycling", "tailoring", "bespoke", "made-to-measure",
        "pattern", "textile", "embroidery", "print", "color palette", "silhouette",
        "cut", "drape", "hem", "neckline", "sleeve", "fashion week", "lookbook",
        "editorial", "campaign", "model", "supermodel", "fashion house", "atelier",
        "boutique", "department store", "e-commerce", "fashion tech", "wearable tech",
        "fashion influencer", "fashion blogger", "stylist", "fashion editor", "trend forecasting"
    ],
    "pets": [
        "dog", "cat", "pet", "animal", "care", "training", "veterinarian", "grooming", 
        "food", "shelter", "play", "adoption", "behavior", "toys", "health",
        "breed", "pedigree", "mixed breed", "rescue", "foster", "pet store", "kennel",
        "cattery", "leash", "collar", "harness", "crate", "cage", "aquarium", "terrarium",
        "litter box", "pet bed", "pet carrier", "vaccination", "microchip", "spay",
        "neuter", "pet insurance", "pet-friendly", "dog park", "agility", "obedience",
        "puppy", "kitten", "senior pet", "exotic pet", "small animal", "bird", "fish",
        "reptile", "rodent", "horse", "equestrian", "pet sitter", "dog walker",
        "pet boarding", "daycare", "pet diet", "pet nutrition", "pet medication",
        "pet supplements", "pet dental care", "pet grooming tools", "pet first aid"
    ],
    "events": [
        "party", "wedding", "celebration", "gathering", "event", "invitation", "venue", 
        "planning", "decorations", "guest", "attendee", "reception", "program", "catering",
        "birthday", "anniversary", "graduation", "baby shower", "bridal shower",
        "bachelor party", "bachelorette party", "reunion", "conference", "seminar",
        "workshop", "trade show", "exhibition", "concert", "festival", "gala",
        "fundraiser", "charity event", "corporate event", "team building", "retreat",
        "holiday party", "New Year's Eve", "Halloween", "Christmas", "Thanksgiving",
        "theme party", "costume party", "outdoor event", "indoor event", "virtual event",
        "hybrid event", "event technology", "event marketing", "event budget",
        "event logistics", "event registration", "event photography", "event videography",
        "event entertainment", "event security", "event insurance"
    ],
    "maintenance": [
        "repair", "service", "maintenance", "fix", "issue", "problem", "install", 
        "inspect", "contractor", "service", "schedule", "work", "quality", "response",
        "preventive maintenance", "corrective maintenance", "routine maintenance",
        "emergency repair", "troubleshooting", "diagnostics", "tune-up", "overhaul",
        "replacement", "upgrade", "restoration", "renovation", "refurbishment",
        "calibration", "lubrication", "cleaning", "painting", "sealing", "welding",
        "plumbing", "electrical", "HVAC", "roofing", "flooring", "appliance repair",
        "automotive maintenance", "home maintenance", "building maintenance",
        "equipment maintenance", "machinery maintenance", "computer maintenance",
        "software updates", "hardware upgrades", "network maintenance", "landscaping",
        "pest control", "waste management", "safety inspection", "compliance check"
    ],
    "community": [
        "community", "support", "help", "neighborhood", "service", "event", "volunteer", 
        "charity", "involvement", "program", "outreach", "resource", "engagement", 
        "activity", "local government", "town hall", "civic engagement", "grassroots",
        "community center", "community garden", "farmers market", "food bank",
        "homeless shelter", "youth center", "senior center", "library", "school",
        "religious institution", "cultural center", "arts program", "sports league",
        "neighborhood watch", "community policing", "public health", "social services",
        "environmental initiative", "sustainability", "recycling program", "clean-up drive",
        "fundraising", "donation", "grant", "non-profit", "NGO", "social enterprise",
        "community development", "urban planning", "rural development", "gentrification",
        "affordable housing", "public transportation", "community activism", "advocacy"
    ]
}

class CategoryIdentifier:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.category_vectors = {}
        self._prepare_category_vectors()

    def _prepare_category_vectors(self):
        all_texts = []
        for category, keywords in categories_keywords.items():
            category_text = ' '.join(keywords)
            all_texts.append(category_text)
        
        # Fit the vectorizer on all category texts
        self.vectorizer.fit(all_texts)
        
        # Transform each category text
        for category, keywords in categories_keywords.items():
            category_text = ' '.join(keywords)
            self.category_vectors[category] = self.vectorizer.transform([category_text])

    def identify_category(self, review):
        review_vector = self.vectorizer.transform([review])
        similarities = {}
        for category, category_vector in self.category_vectors.items():
            similarity = cosine_similarity(review_vector, category_vector)[0][0]
            similarities[category] = similarity
        
        best_category = max(similarities, key=similarities.get)
        return best_category if similarities[best_category] > 0.1 else "unknown"

    def categorize_reviews(self, reviews):
        categorized = defaultdict(list)
        for review in reviews:
            category = self.identify_category(review)
            categorized[category].append(review)
        return dict(categorized)

# Initialize the CategoryIdentifier
category_identifier = CategoryIdentifier()

def categorize_review(review):
    return category_identifier.identify_category(review)

def categorize_reviews(reviews):
    return category_identifier.categorize_reviews(reviews)