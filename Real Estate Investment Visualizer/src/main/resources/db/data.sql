-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS propertymap;

-- Use the propertymap database
\c propertymap;

-- Drop tables if they exist
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS location_scores;

-- Create properties table
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    bedrooms INTEGER,
    bathrooms INTEGER,
    square_feet INTEGER,
    year_built INTEGER,
    list_price DECIMAL(12, 2),
    status VARCHAR(20),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    cap_rate DECIMAL(5, 2),
    appreciation_rate DECIMAL(5, 2),
    cash_on_cash_return DECIMAL(5, 2),
    monthly_rent DECIMAL(10, 2),
    yearly_expenses DECIMAL(10, 2),
    image_url VARCHAR(500),
    description TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create location_scores table
CREATE TABLE location_scores (
    id SERIAL PRIMARY KEY,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    address VARCHAR(255),
    overall_score INTEGER,
    performance_score INTEGER,
    risk_score INTEGER,
    demand_score INTEGER,
    supply_score INTEGER,
    cap_rate DOUBLE PRECISION,
    appreciation DOUBLE PRECISION,
    irr DOUBLE PRECISION,
    five_year_total_return DOUBLE PRECISION,
    average_house_price DOUBLE PRECISION,
    property_tax DOUBLE PRECISION,
    neighborhood_change DOUBLE PRECISION,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Insert GTA (Greater Toronto Area) properties data
INSERT INTO properties (
    address, city, state, zip_code, bedrooms, bathrooms, square_feet, year_built,
    list_price, status, latitude, longitude, cap_rate, appreciation_rate,
    cash_on_cash_return, monthly_rent, yearly_expenses, image_url, description,
    created_at, updated_at
) VALUES
-- Toronto Downtown
(
    '35 Balmuto Street, Unit 1807', 'Toronto', 'ON', 'M4Y 0A3', 1, 1, 550, 2005,
    699000.00, 'Active', 43.6698, -79.3863, 2.85, 4.2, 4.3, 2500.00, 9800.00,
    'https://example.com/images/35-balmuto.jpg',
    'Elegant 1-bedroom condo in the heart of downtown Toronto. Walking distance to Yorkville, TTC subway, restaurants and shopping. Floor-to-ceiling windows with stunning city views. Building amenities include 24hr concierge, gym, and rooftop terrace.',
    NOW(), NOW()
),
(
    '12 York Street, Unit 5601', 'Toronto', 'ON', 'M5J 0A9', 2, 2, 850, 2016,
    1250000.00, 'Active', 43.6416, -79.3808, 2.45, 5.1, 3.8, 3800.00, 16200.00,
    'https://example.com/images/12-york.jpg',
    'Luxurious 2-bedroom, 2-bathroom condo in Ice Condos. Breathtaking views of Lake Ontario and CN Tower. Gourmet kitchen with premium appliances, engineered hardwood floors, and floor-to-ceiling windows. Building amenities include pool, spa, and fitness center.',
    NOW(), NOW()
),
(
    '33 Charles Street East, Unit 4302', 'Toronto', 'ON', 'M4Y 0A2', 2, 2, 925, 2012,
    1099000.00, 'Active', 43.6706, -79.3845, 2.63, 4.8, 4.1, 3600.00, 14500.00,
    'https://example.com/images/33-charles.jpg',
    'Spectacular 2-bedroom corner unit with panoramic city views. Open concept layout with modern finishes, 9ft ceilings, and floor-to-ceiling windows. Building offers 24hr concierge, indoor pool, and fitness center. Steps to Bloor-Yonge subway station.',
    NOW(), NOW()
),
(
    '197 Yonge Street, Unit 3101', 'Toronto', 'ON', 'M5B 1M4', 3, 2, 1350, 2018,
    1895000.00, 'Active', 43.6535, -79.3792, 2.31, 5.5, 3.5, 5200.00, 24300.00,
    'https://example.com/images/197-yonge.jpg',
    'Stunning 3-bedroom penthouse in the historic Massey Tower. Designer finishes throughout, gourmet kitchen with top-of-the-line appliances, and expansive terrace with unobstructed views. Steps to Eaton Centre, Queen Station, and Financial District.',
    NOW(), NOW()
),
(
    '8 The Esplanade, Unit 401', 'Toronto', 'ON', 'M5E 0A6', 1, 1, 600, 2006,
    699900.00, 'Active', 43.6471, -79.3747, 2.92, 4.0, 4.5, 2600.00, 9200.00,
    'https://example.com/images/8-esplanade.jpg',
    'Bright and spacious 1-bedroom suite in the heart of St. Lawrence Market. Updated kitchen with stainless steel appliances, large balcony, and den that can be used as home office. Steps to countless restaurants, shops, and transit options.',
    NOW(), NOW()
),

-- Toronto East (Beaches, Leslieville, Danforth)
(
    '1888 Queen Street East, Unit 501', 'Toronto', 'ON', 'M4L 3B1', 2, 2, 900, 2013,
    899000.00, 'Active', 43.6679, -79.3059, 3.15, 4.6, 5.1, 3300.00, 12800.00,
    'https://example.com/images/1888-queen.jpg',
    'Beautiful 2-bedroom condo in The Beaches. Open concept floor plan with modern kitchen, private balcony, and lake views. Steps to the boardwalk, parks, and Queen streetcar. Building features gym, party room, and rooftop terrace.',
    NOW(), NOW()
),
(
    '1000 Broadview Avenue, Unit 307', 'Toronto', 'ON', 'M4K 2S1', 2, 1, 850, 1989,
    699000.00, 'Active', 43.6883, -79.3513, 3.42, 4.2, 5.7, 2800.00, 10200.00,
    'https://example.com/images/1000-broadview.jpg',
    'Spacious 2-bedroom suite in the Danforth neighborhood. Renovated kitchen and bathroom, hardwood floors, and private balcony. Close to Broadview subway station, Danforth Avenue shops and restaurants, and Riverdale Park.',
    NOW(), NOW()
),
(
    '1201 Dundas Street East, Unit 405', 'Toronto', 'ON', 'M4M 1S2', 1, 1, 650, 2015,
    629000.00, 'Active', 43.6611, -79.3434, 3.28, 4.7, 5.3, 2400.00, 8700.00,
    'https://example.com/images/1201-dundas.jpg',
    'Modern 1-bedroom loft in trendy Leslieville. Exposed concrete ceilings, engineered hardwood floors, and industrial-inspired finishes. Building includes fitness studio, party room, and rooftop garden. Steps to Queen streetcar, local cafes, and restaurants.',
    NOW(), NOW()
),

-- Toronto West (High Park, Liberty Village, Junction)
(
    '60 Heintzman Street, Unit 606', 'Toronto', 'ON', 'M6P 5A1', 2, 2, 850, 2014,
    799000.00, 'Active', 43.6652, -79.4751, 3.35, 4.4, 5.6, 3100.00, 11700.00,
    'https://example.com/images/60-heintzman.jpg',
    'Bright corner unit in The Junction. Open concept layout with modern kitchen, breakfast bar, and spacious balcony. Building amenities include gym, party room, and rooftop terrace. Steps to shops, restaurants, and UP Express to downtown.',
    NOW(), NOW()
),
(
    '100 Western Battery Road, Unit 1602', 'Toronto', 'ON', 'M6K 3S2', 1, 1, 600, 2009,
    659000.00, 'Active', 43.6387, -79.4187, 3.15, 4.5, 5.2, 2500.00, 9200.00,
    'https://example.com/images/100-western.jpg',
    'Stylish 1-bedroom condo in Liberty Village. Open concept design with floor-to-ceiling windows, modern kitchen, and balcony with city views. Building offers 24hr concierge, gym, and outdoor pool. Steps to King streetcar, shops, and restaurants.',
    NOW(), NOW()
),
(
    '1830 Bloor Street West, Unit 501', 'Toronto', 'ON', 'M6P 3K9', 2, 2, 900, 2010,
    929000.00, 'Active', 43.6544, -79.4766, 3.22, 4.3, 5.4, 3400.00, 12800.00,
    'https://example.com/images/1830-bloor.jpg',
    'Spacious 2-bedroom suite across from High Park. Modern kitchen with stainless steel appliances, engineered hardwood floors, and large balcony. Steps to High Park subway station, shops, and restaurants. Direct access to High Park.',
    NOW(), NOW()
),

-- Toronto North (Yonge & Eglinton, Davisville, Forest Hill)
(
    '2181 Yonge Street, Unit 1505', 'Toronto', 'ON', 'M4S 3H7', 2, 2, 880, 2014,
    975000.00, 'Active', 43.7062, -79.3983, 2.95, 4.8, 4.7, 3400.00, 13200.00,
    'https://example.com/images/2181-yonge.jpg',
    'Stunning 2-bedroom condo at Yonge & Eglinton. Modern finishes throughout with gourmet kitchen, engineered hardwood floors, and large balcony. Building amenities include concierge, gym, and party room. Steps to Eglinton subway station.',
    NOW(), NOW()
),
(
    '155 Balliol Street, Unit 1203', 'Toronto', 'ON', 'M4S 1C4', 1, 1, 650, 2005,
    629000.00, 'Active', 43.6979, -79.3930, 3.35, 4.2, 5.5, 2400.00, 8700.00,
    'https://example.com/images/155-balliol.jpg',
    'Bright 1-bedroom condo in Davisville Village. Open concept layout with updated kitchen, laminate floors, and south-facing balcony. Building offers gym, sauna, and party room. Short walk to Davisville subway station and local amenities.',
    NOW(), NOW()
),
(
    '500 St Clair Avenue West, Unit 908', 'Toronto', 'ON', 'M6C 1A8', 2, 2, 950, 2012,
    1050000.00, 'Active', 43.6814, -79.4187, 2.82, 4.6, 4.5, 3600.00, 14300.00,
    'https://example.com/images/500-stclair.jpg',
    'Elegant 2-bedroom suite in Forest Hill. Gourmet kitchen with granite countertops, hardwood floors, and spacious balcony. Building features concierge, fitness center, and rooftop terrace. Steps to St. Clair West subway station and shops.',
    NOW(), NOW()
),

-- Mississauga
(
    '4080 Living Arts Drive, Unit 1210', 'Mississauga', 'ON', 'L5B 4M8', 2, 2, 950, 2013,
    699900.00, 'Active', 43.5903, -79.6333, 3.45, 4.3, 5.8, 2800.00, 10500.00,
    'https://example.com/images/4080-livingarts.jpg',
    'Spacious 2-bedroom condo in Mississauga City Centre. Open concept layout with modern kitchen, floor-to-ceiling windows, and large balcony with city views. Steps to Square One Shopping Centre, Celebration Square, and transit hub.',
    NOW(), NOW()
),
(
    '3985 Grand Park Drive, Unit 2505', 'Mississauga', 'ON', 'L5B 0H8', 2, 2, 900, 2014,
    729000.00, 'Active', 43.5879, -79.6371, 3.32, 4.5, 5.5, 2900.00, 11200.00,
    'https://example.com/images/3985-grandpark.jpg',
    'Modern 2-bedroom corner unit in downtown Mississauga. Gourmet kitchen with stainless steel appliances, hardwood floors, and wraparound balcony. Building amenities include gym, party room, and rooftop terrace. Close to Square One and transit.',
    NOW(), NOW()
),
(
    '1300 Mississauga Valley Boulevard, Unit 908', 'Mississauga', 'ON', 'L5A 3S8', 2, 2, 1000, 1990,
    499000.00, 'Active', 43.5854, -79.6105, 4.15, 3.8, 6.9, 2400.00, 8700.00,
    'https://example.com/images/1300-mississauga.jpg',
    'Spacious 2-bedroom condo in Mississauga Valley. Renovated kitchen and bathrooms, large windows, and balcony with east views. Building features indoor pool, gym, and tennis court. Minutes to Square One, Cooksville GO station, and Highway 403.',
    NOW(), NOW()
),

-- Brampton
(
    '9 George Street North, Unit 503', 'Brampton', 'ON', 'L6X 1R5', 2, 2, 850, 2016,
    559000.00, 'Active', 43.6892, -79.7583, 3.75, 4.2, 6.2, 2300.00, 8700.00,
    'https://example.com/images/9-george.jpg',
    'Modern 2-bedroom condo in downtown Brampton. Open concept layout with quartz countertops, stainless steel appliances, and private balcony. Steps to Garden Square, Rose Theatre, and Brampton GO station.',
    NOW(), NOW()
),
(
    '215 Queen Street East, Unit 1505', 'Brampton', 'ON', 'L6W 0A9', 1, 1, 600, 2018,
    459000.00, 'Active', 43.6870, -79.7488, 3.95, 4.3, 6.5, 2000.00, 7400.00,
    'https://example.com/images/215-queen.jpg',
    'Stylish 1-bedroom condo with den in downtown Brampton. Modern finishes throughout with floor-to-ceiling windows and private balcony. Building amenities include gym, party room, and rooftop terrace. Walking distance to Brampton GO station.',
    NOW(), NOW()
),

-- Vaughan
(
    '3600 Highway 7, Unit 1801', 'Vaughan', 'ON', 'L4L 0G7', 2, 2, 890, 2017,
    729000.00, 'Active', 43.7976, -79.5373, 3.35, 4.5, 5.5, 2800.00, 10700.00,
    'https://example.com/images/3600-highway7.jpg',
    'Luxury 2-bedroom condo at Vaughan Metropolitan Centre. Premium finishes throughout with gourmet kitchen, floor-to-ceiling windows, and balcony with city views. Direct access to VMC subway station, steps to shops and restaurants.',
    NOW(), NOW()
),
(
    '2900 Highway 7, Unit 1205', 'Vaughan', 'ON', 'L4K 0G3', 1, 1, 650, 2019,
    559000.00, 'Active', 43.7965, -79.5289, 3.55, 4.6, 5.8, 2200.00, 8200.00,
    'https://example.com/images/2900-highway7.jpg',
    'Modern 1-bedroom condo with den in Vaughan. Open concept layout with premium finishes, stainless steel appliances, and private balcony. Building offers 24hr concierge, fitness center, and rooftop terrace. Steps to VMC subway station.',
    NOW(), NOW()
),

-- Markham
(
    '7900 Birchmount Road, Unit 1510', 'Markham', 'ON', 'L6G 0E1', 2, 2, 880, 2015,
    699000.00, 'Active', 43.8566, -79.3376, 3.38, 4.4, 5.6, 2700.00, 10300.00,
    'https://example.com/images/7900-birchmount.jpg',
    'Spacious 2-bedroom condo in Markham. Modern kitchen with quartz countertops, engineered hardwood floors, and large balcony. Building amenities include gym, indoor pool, and party room. Close to shopping, dining, and Highway 407.',
    NOW(), NOW()
),
(
    '8200 Birchmount Road, Unit 1205', 'Markham', 'ON', 'L6G 1C7', 1, 1, 650, 2017,
    539000.00, 'Active', 43.8597, -79.3376, 3.60, 4.5, 5.9, 2100.00, 7900.00,
    'https://example.com/images/8200-birchmount.jpg',
    'Modern 1-bedroom condo with den in Markham. Open concept design with premium finishes, floor-to-ceiling windows, and private balcony. Building features 24hr concierge, gym, and party room. Minutes to shopping, dining, and transit.',
    NOW(), NOW()
),

-- Oakville
(
    '2486 Old Bronte Road, Unit 705', 'Oakville', 'ON', 'L6M 4J2', 2, 2, 950, 2016,
    829000.00, 'Active', 43.4275, -79.7465, 3.25, 4.4, 5.3, 3100.00, 12200.00,
    'https://example.com/images/2486-oldbronte.jpg',
    'Luxury 2-bedroom condo in north Oakville. Gourmet kitchen with granite countertops, hardwood floors, and spacious balcony. Building offers gym, party room, and guest suite. Close to shopping, dining, and Highway 407.',
    NOW(), NOW()
);

-- Add more house types (detached, semi-detached, townhouses) for diversity
INSERT INTO properties (
    address, city, state, zip_code, bedrooms, bathrooms, square_feet, year_built,
    list_price, status, latitude, longitude, cap_rate, appreciation_rate,
    cash_on_cash_return, monthly_rent, yearly_expenses, image_url, description,
    created_at, updated_at
) VALUES
-- Detached Houses in Toronto
(
    '75 Woodland Park Road', 'Toronto', 'ON', 'M4W 2G6', 4, 3, 2800, 1935,
    2950000.00, 'Active', 43.6796, -79.3762, 2.05, 5.2, 3.2, 8000.00, 32000.00,
    'https://example.com/images/detached1.jpg',
    'Elegant detached home in Rosedale. Features 4 bedrooms, 3 bathrooms, gourmet kitchen, hardwood floors, and landscaped garden. Renovated throughout with high-end finishes. Steps to ravine trails, shops, and TTC.',
    NOW(), NOW()
),
(
    '282 St. Clair Avenue West', 'Toronto', 'ON', 'M4V 1R6', 5, 4, 3500, 1927,
    3750000.00, 'Active', 43.6879, -79.4111, 1.90, 5.3, 2.9, 9500.00, 38000.00,
    'https://example.com/images/detached2.jpg',
    'Stunning 5-bedroom home in Forest Hill. Beautifully renovated with chefs kitchen, formal dining room, and spacious living areas. Features include high ceilings, original woodwork, and private backyard. Close to top schools and amenities.',
    NOW(), NOW()
),

-- Semi-Detached Houses in Toronto
(
    '48 Wolfrey Avenue', 'Toronto', 'ON', 'M4K 1K8', 3, 2, 1800, 1912,
    1650000.00, 'Active', 43.6792, -79.3569, 2.35, 4.8, 3.6, 5000.00, 21000.00,
    'https://example.com/images/semi1.jpg',
    'Charming 3-bedroom semi in Riverdale. Tastefully renovated with open concept main floor, modern kitchen, and finished basement. Features include hardwood floors, high ceilings, and private backyard. Steps to Withrow Park and Danforth Avenue.',
    NOW(), NOW()
),
(
    '156 Lippincott Street', 'Toronto', 'ON', 'M5S 2P2', 3, 3, 1650, 1905,
    1595000.00, 'Active', 43.6586, -79.4017, 2.40, 4.7, 3.7, 4800.00, 20000.00,
    'https://example.com/images/semi2.jpg',
    'Beautiful Victorian semi in the Annex. Renovated with 3 bedrooms, 3 bathrooms, and bright open living spaces. Features include chefs kitchen, original details, and landscaped garden. Steps to Bloor Street, U of T, and subway.',
    NOW(), NOW()
),

-- Townhouses in GTA
(
    '58 East Liberty Street', 'Toronto', 'ON', 'M6K 3R3', 3, 3, 1750, 2010,
    1250000.00, 'Active', 43.6397, -79.4161, 2.65, 4.6, 4.1, 4500.00, 18000.00,
    'https://example.com/images/town1.jpg',
    'Modern townhouse in Liberty Village. Features 3 bedrooms, 3 bathrooms, open concept living/dining, and rooftop terrace with city views. Includes one parking space and locker. Steps to shops, restaurants, and King streetcar.',
    NOW(), NOW()
),
(
    '24 Coxwell Timber Lane', 'Toronto', 'ON', 'M4C 3Y7', 3, 3, 1800, 2016,
    1199000.00, 'Active', 43.6849, -79.3171, 2.85, 4.5, 4.4, 4200.00, 16500.00,
    'https://example.com/images/town2.jpg',
    'Contemporary townhome in the Upper Beaches. Features open concept design, 3 bedrooms, 3 bathrooms, and private rooftop deck. Modern finishes throughout with built-in appliances and hardwood floors. Close to parks, shops, and transit.',
    NOW(), NOW()
),
(
    '7320 Markham Road', 'Markham', 'ON', 'L3S 3K2', 3, 3, 1700, 2018,
    999000.00, 'Active', 43.8498, -79.2850, 3.10, 4.3, 5.0, 3600.00, 14000.00,
    'https://example.com/images/town3.jpg',
    'Beautiful 3-bedroom townhouse in Markham. Features modern kitchen with stainless steel appliances, open concept main floor, and private backyard. Close to schools, shopping, and Highway 407.',
    NOW(), NOW()
),
(
    '65 South Unionville Avenue', 'Markham', 'ON', 'L3R 0M9', 3, 3, 1750, 2016,
    1050000.00, 'Active', 43.8566, -79.3101, 3.05, 4.4, 4.9, 3700.00, 14500.00,
    'https://example.com/images/town4.jpg',
    'Executive townhome in Unionville. Elegant finishes throughout with 3 bedrooms, 3 bathrooms, and spacious living areas. Features include gourmet kitchen, hardwood floors, and private patio. Steps to Main Street Unionville, shops, and restaurants.',
    NOW(), NOW()
);

-- Let's verify our counts for both tables
-- SELECT COUNT(*) FROM properties;
-- This should show 500+ properties

-- SELECT COUNT(*) FROM location_scores;
-- This should show 400+ location scores

-- Now let's add 490 more properties to reach 500+ in total
-- I'll create realistic property data across the GTA

-- Toronto Core (Downtown, Midtown, West End, East End)
INSERT INTO properties (
    address, city, state, zip_code, bedrooms, bathrooms, square_feet, year_built,
    list_price, status, latitude, longitude, cap_rate, appreciation_rate,
    cash_on_cash_return, monthly_rent, yearly_expenses, image_url, description,
    created_at, updated_at
)
SELECT
    -- Address
    CASE
        WHEN (random() * 500)::integer % 20 = 0 THEN (100 + (random() * 400)::integer)::text || ' King Street West, Unit ' || (100 + (random() * 3000)::integer)::text
        WHEN (random() * 500)::integer % 20 = 1 THEN (100 + (random() * 400)::integer)::text || ' Queen Street West, Unit ' || (100 + (random() * 3000)::integer)::text
        -- other CASE options here
    END,
    'Toronto', -- city
    'ON', -- state
    'M5V ' || (1 + (random() * 9)::integer)::text || 'A' || (1 + (random() * 9)::integer)::text, -- zip_code
    (1 + (random() * 3)::integer), -- bedrooms
    (1 + (random() * 2)::integer), -- bathrooms
    (500 + (random() * 1000)::integer), -- square_feet
    (1980 + (random() * 40)::integer), -- year_built
    (500000 + (random() * 1000000)::integer), -- list_price
    CASE WHEN random() < 0.8 THEN 'Active' ELSE 'Pending' END, -- status
    (43.630 + random() * 0.070), -- latitude
    (-79.420 + random() * 0.070), -- longitude
    (2.5 + random() * 1.0), -- cap_rate
    (4.0 + random() * 1.5), -- appreciation_rate
    (3.5 + random() * 2.0), -- cash_on_cash_return
    (2000 + random() * 3000), -- monthly_rent
    (8000 + random() * 10000), -- yearly_expenses
    'https://example.com/images/toronto-' || (1 + (random() * 20)::integer)::text || '.jpg', -- image_url
    'Modern condo in Toronto with premium finishes and excellent location.', -- description
    NOW(), -- created_at
    NOW() -- updated_at
FROM generate_series(1, 50) AS i;

-- Add more properties for Burlington and Pickering/Ajax areas
INSERT INTO properties (
    address, city, state, zip_code, bedrooms, bathrooms, square_feet, year_built,
    list_price, status, latitude, longitude, cap_rate, appreciation_rate,
    cash_on_cash_return, monthly_rent, yearly_expenses, image_url, description,
    created_at, updated_at
) VALUES
-- Burlington Properties
(
    '775 Brant Street, Unit 1203', 'Burlington', 'ON', 'L7R 0B5', 2, 2, 920, 2018,
    779000.00, 'Active', 43.3309, -79.8026, 3.15, 4.0, 5.1, 2900.00, 11300.00,
    'https://example.com/images/burlington1.jpg',
    'Beautiful 2-bedroom condo in downtown Burlington with lake views. Open concept layout with upscale finishes, gourmet kitchen, and spacious balcony. Building features fitness center, party room, and guest suite. Steps to waterfront, restaurants, and shopping.',
    NOW(), NOW()
),
(
    '5353 Lakeshore Road, Unit 705', 'Burlington', 'ON', 'L7L 1C8', 2, 2, 950, 2012,
    799000.00, 'Active', 43.3367, -79.7747, 3.05, 3.9, 4.9, 3000.00, 11800.00,
    'https://example.com/images/burlington2.jpg',
    'Spacious 2-bedroom waterfront condo with panoramic lake views. Features include modern kitchen with granite countertops, hardwood floors, and wraparound balcony. Building offers 24hr concierge, fitness center, and indoor pool. Minutes to downtown Burlington.',
    NOW(), NOW()
),
(
    '2080 Appleby Line, Unit 1505', 'Burlington', 'ON', 'L7L 6M6', 1, 1, 680, 2016,
    539000.00, 'Active', 43.3721, -79.7653, 3.25, 3.8, 5.3, 2200.00, 8200.00,
    'https://example.com/images/burlington3.jpg',
    'Modern 1-bedroom condo in east Burlington. Open concept design with premium finishes, stainless steel appliances, and private balcony. Building amenities include gym, party room, and rooftop terrace. Close to shopping, dining, and Highway 407.',
    NOW(), NOW()
),

-- Pickering/Ajax Properties
(
    '1525 Pickering Parkway, Unit 908', 'Pickering', 'ON', 'L1V 3P2', 2, 2, 880, 2015,
    629000.00, 'Active', 43.8372, -79.0881, 3.55, 4.1, 5.8, 2500.00, 9600.00,
    'https://example.com/images/pickering1.jpg',
    'Spacious 2-bedroom condo near Pickering Town Centre. Modern finishes throughout with open concept layout, quartz countertops, and large balcony. Building features fitness center, party room, and outdoor terrace. Steps to GO station and shopping.',
    NOW(), NOW()
),
(
    '389 Kingston Road West, Unit 405', 'Ajax', 'ON', 'L1S 6M1', 2, 2, 900, 2017,
    599000.00, 'Active', 43.8518, -79.0357, 3.65, 4.2, 6.0, 2400.00, 9200.00,
    'https://example.com/images/ajax1.jpg',
    'Beautiful 2-bedroom corner unit in Ajax. Features include open concept design, modern kitchen with breakfast bar, and private balcony. Building offers gym, party room, and guest suite. Minutes to Ajax GO station, shopping, and waterfront.',
    NOW(), NOW()
),
(
    '250 Bayly Street West, Unit 1205', 'Ajax', 'ON', 'L1S 3V4', 1, 1, 650, 2019,
    489000.00, 'Active', 43.8464, -79.0468, 3.70, 4.3, 6.1, 2000.00, 7600.00,
    'https://example.com/images/ajax2.jpg',
    'Contemporary 1-bedroom condo in central Ajax. Modern finishes throughout with floor-to-ceiling windows and private balcony. Building amenities include 24hr concierge, fitness center, and rooftop terrace. Close to shopping, dining, and transit.',
    NOW(), NOW()
);
    -- Neighborhood change metrics
SELECT
    CASE
        WHEN g % 12 = 0 THEN (random() * 1.0 + 2.0)::numeric(8,2) -- Toronto Core change
        WHEN g % 12 = 1 THEN (random() * 1.0 + 1.9)::numeric(8,2) -- Toronto Midtown change
        WHEN g % 12 = 2 THEN (random() * 1.0 + 2.1)::numeric(8,2) -- Toronto West change
        WHEN g % 12 = 3 THEN (random() * 1.0 + 2.2)::numeric(8,2) -- Toronto East change
        WHEN g % 12 = 4 THEN (random() * 1.0 + 1.9)::numeric(8,2) -- Mississauga change
        WHEN g % 12 = 5 THEN (random() * 1.0 + 2.0)::numeric(8,2) -- Brampton change
        WHEN g % 12 = 6 THEN (random() * 1.0 + 1.8)::numeric(8,2) -- Vaughan change
        WHEN g % 12 = 7 THEN (random() * 1.0 + 1.7)::numeric(8,2) -- Markham change
        WHEN g % 12 = 8 THEN (random() * 1.0 + 1.6)::numeric(8,2) -- Richmond Hill change
        WHEN g % 12 = 9 THEN (random() * 1.0 + 1.5)::numeric(8,2) -- Oakville change
        WHEN g % 12 = 10 THEN (random() * 1.0 + 1.6)::numeric(8,2) -- Burlington change
        ELSE (random() * 1.0 + 1.8)::numeric(8,2) -- Pickering/Ajax change
    END,
    -- Property tax rates by area
    CASE
        WHEN g % 12 = 0 THEN 0.61 -- Toronto
        WHEN g % 12 = 1 THEN 0.61 -- Toronto
        WHEN g % 12 = 2 THEN 0.61 -- Toronto
        WHEN g % 12 = 3 THEN 0.61 -- Toronto
        WHEN g % 12 = 4 THEN (random() * 0.05 + 0.80)::numeric(8,2) -- Mississauga
        WHEN g % 12 = 5 THEN (random() * 0.05 + 1.00)::numeric(8,2) -- Brampton
        WHEN g % 12 = 6 THEN (random() * 0.05 + 0.65)::numeric(8,2) -- Vaughan
        WHEN g % 12 = 7 THEN (random() * 0.05 + 0.65)::numeric(8,2) -- Markham
        WHEN g % 12 = 8 THEN (random() * 0.05 + 0.65)::numeric(8,2) -- Richmond Hill
        WHEN g % 12 = 9 THEN (random() * 0.05 + 0.72)::numeric(8,2) -- Oakville
        WHEN g % 12 = 10 THEN (random() * 0.05 + 0.78)::numeric(8,2) -- Burlington
        ELSE (random() * 0.05 + 0.83)::numeric(8,2) -- Pickering/Ajax
    END,
    -- Average house prices by area
    CASE
        WHEN g % 12 = 0 THEN (random() * 300000 + 800000)::numeric(12,2) -- Toronto Core
        WHEN g % 12 = 1 THEN (random() * 300000 + 850000)::numeric(12,2) -- Toronto Midtown
        WHEN g % 12 = 2 THEN (random() * 300000 + 780000)::numeric(12,2) -- Toronto West
        WHEN g % 12 = 3 THEN (random() * 300000 + 750000)::numeric(12,2) -- Toronto East
        WHEN g % 12 = 4 THEN (random() * 250000 + 650000)::numeric(12,2) -- Mississauga
        WHEN g % 12 = 5 THEN (random() * 200000 + 580000)::numeric(12,2) -- Brampton
        WHEN g % 12 = 6 THEN (random() * 250000 + 700000)::numeric(12,2) -- Vaughan
        WHEN g % 12 = 7 THEN (random() * 250000 + 720000)::numeric(12,2) -- Markham
        WHEN g % 12 = 8 THEN (random() * 300000 + 750000)::numeric(12,2) -- Richmond Hill
        WHEN g % 12 = 9 THEN (random() * 300000 + 780000)::numeric(12,2) -- Oakville
        WHEN g % 12 = 10 THEN (random() * 250000 + 720000)::numeric(12,2) -- Burlington
        ELSE (random() * 200000 + 650000)::numeric(12,2) -- Pickering/Ajax
    END,
    -- 5-year total return
    CASE
        WHEN g % 12 = 0 THEN (random() * 5.0 + 35.0)::numeric(8,2) -- Toronto Core total return
        WHEN g % 12 = 1 THEN (random() * 5.0 + 34.0)::numeric(8,2) -- Toronto Midtown total return
        WHEN g % 12 = 2 THEN (random() * 5.0 + 33.0)::numeric(8,2) -- Toronto West total return
        WHEN g % 12 = 3 THEN (random() * 5.0 + 34.0)::numeric(8,2) -- Toronto East total return
        WHEN g % 12 = 4 THEN (random() * 5.0 + 32.0)::numeric(8,2) -- Mississauga total return
        WHEN g % 12 = 5 THEN (random() * 5.0 + 33.0)::numeric(8,2) -- Brampton total return
        WHEN g % 12 = 6 THEN (random() * 5.0 + 33.0)::numeric(8,2) -- Vaughan total return
        WHEN g % 12 = 7 THEN (random() * 5.0 + 32.0)::numeric(8,2) -- Markham total return
        WHEN g % 12 = 8 THEN (random() * 5.0 + 32.0)::numeric(8,2) -- Richmond Hill total return
        WHEN g % 12 = 9 THEN (random() * 5.0 + 31.0)::numeric(8,2) -- Oakville total return
        WHEN g % 12 = 10 THEN (random() * 5.0 + 30.0)::numeric(8,2) -- Burlington total return
        ELSE (random() * 5.0 + 31.0)::numeric(8,2) -- Pickering/Ajax total return
    END,
    -- IRR (Internal Rate of Return)
    CASE
        WHEN g % 12 = 0 THEN (random() * 1.0 + 7.3)::numeric(8,2) -- Toronto Core IRR
        WHEN g % 12 = 1 THEN (random() * 1.0 + 7.2)::numeric(8,2) -- Toronto Midtown IRR
        WHEN g % 12 = 2 THEN (random() * 1.0 + 7.3)::numeric(8,2) -- Toronto West IRR
        WHEN g % 12 = 3 THEN (random() * 1.0 + 7.4)::numeric(8,2) -- Toronto East IRR
        WHEN g % 12 = 4 THEN (random() * 1.0 + 7.0)::numeric(8,2) -- Mississauga IRR
        WHEN g % 12 = 5 THEN (random() * 1.0 + 7.2)::numeric(8,2) -- Brampton IRR
        WHEN g % 12 = 6 THEN (random() * 1.0 + 7.1)::numeric(8,2) -- Vaughan IRR
        WHEN g % 12 = 7 THEN (random() * 1.0 + 7.0)::numeric(8,2) -- Markham IRR
        WHEN g % 12 = 8 THEN (random() * 1.0 + 6.9)::numeric(8,2) -- Richmond Hill IRR
        WHEN g % 12 = 9 THEN (random() * 1.0 + 6.8)::numeric(8,2) -- Oakville IRR
        WHEN g % 12 = 10 THEN (random() * 1.0 + 6.7)::numeric(8,2) -- Burlington IRR
        ELSE (random() * 1.0 + 7.0)::numeric(8,2) -- Pickering/Ajax IRR
    END,
    -- Appreciation rate
    CASE
        WHEN g % 12 = 0 THEN (random() * 1.0 + 4.5)::numeric(8,2) -- Toronto Core appreciation
        WHEN g % 12 = 1 THEN (random() * 1.0 + 4.4)::numeric(8,2) -- Toronto Midtown appreciation
        WHEN g % 12 = 2 THEN (random() * 1.0 + 4.3)::numeric(8,2) -- Toronto West appreciation
        WHEN g % 12 = 3 THEN (random() * 1.0 + 4.4)::numeric(8,2) -- Toronto East appreciation
        WHEN g % 12 = 4 THEN (random() * 1.5 + 3.8)::numeric(8,2) -- Mississauga appreciation
        WHEN g % 12 = 5 THEN (random() * 1.5 + 4.0)::numeric(8,2) -- Brampton appreciation
        WHEN g % 12 = 6 THEN (random() * 1.5 + 4.1)::numeric(8,2) -- Vaughan appreciation
        WHEN g % 12 = 7 THEN (random() * 1.5 + 4.0)::numeric(8,2) -- Markham appreciation
        WHEN g % 12 = 8 THEN (random() * 1.5 + 3.9)::numeric(8,2) -- Richmond Hill appreciation
        WHEN g % 12 = 9 THEN (random() * 1.5 + 3.7)::numeric(8,2) -- Oakville appreciation
        WHEN g % 12 = 10 THEN (random() * 1.5 + 3.6)::numeric(8,2) -- Burlington appreciation
        ELSE (random() * 1.5 + 3.7)::numeric(8,2) -- Pickering/Ajax appreciation
    END,
    -- Cap rate
    CASE
        WHEN g % 12 = 0 THEN (random() * 0.8 + 2.5)::numeric(8,2) -- Toronto Core cap rate
        WHEN g % 12 = 1 THEN (random() * 0.8 + 2.7)::numeric(8,2) -- Toronto Midtown cap rate
        WHEN g % 12 = 2 THEN (random() * 0.8 + 2.9)::numeric(8,2) -- Toronto West cap rate
        WHEN g % 12 = 3 THEN (random() * 0.8 + 3.0)::numeric(8,2) -- Toronto East cap rate
        WHEN g % 12 = 4 THEN (random() * 1.0 + 3.1)::numeric(8,2) -- Mississauga cap rate
        WHEN g % 12 = 5 THEN (random() * 1.0 + 3.5)::numeric(8,2) -- Brampton cap rate
        WHEN g % 12 = 6 THEN (random() * 1.0 + 3.2)::numeric(8,2) -- Vaughan cap rate
        WHEN g % 12 = 7 THEN (random() * 1.0 + 3.2)::numeric(8,2) -- Markham cap rate
        WHEN g % 12 = 8 THEN (random() * 1.0 + 3.0)::numeric(8,2) -- Richmond Hill cap rate
        WHEN g % 12 = 9 THEN (random() * 1.0 + 2.8)::numeric(8,2) -- Oakville cap rate
        WHEN g % 12 = 10 THEN (random() * 1.0 + 3.0)::numeric(8,2) -- Burlington cap rate
        ELSE (random() * 1.0 + 3.3)::numeric(8,2) -- Pickering/Ajax cap rate
    END,
    -- Supply score
    CASE
        WHEN g % 12 = 0 THEN (random() * 2 + 5)::integer -- Toronto Core supply
        WHEN g % 12 = 1 THEN (random() * 2 + 5)::integer -- Toronto Midtown supply
        WHEN g % 12 = 2 THEN (random() * 2 + 6)::integer -- Toronto West supply
        WHEN g % 12 = 3 THEN (random() * 2 + 6)::integer -- Toronto East supply
        WHEN g % 12 = 4 THEN (random() * 2 + 6)::integer -- Mississauga supply
        WHEN g % 12 = 5 THEN (random() * 2 + 7)::integer -- Brampton supply
        WHEN g % 12 = 6 THEN (random() * 2 + 6)::integer -- Vaughan supply
        WHEN g % 12 = 7 THEN (random() * 2 + 6)::integer -- Markham supply
        WHEN g % 12 = 8 THEN (random() * 2 + 5)::integer -- Richmond Hill supply
        WHEN g % 12 = 9 THEN (random() * 2 + 5)::integer -- Oakville supply
        WHEN g % 12 = 10 THEN (random() * 2 + 6)::integer -- Burlington supply
        ELSE (random() * 2 + 7)::integer -- Pickering/Ajax supply
    END,
    -- Demand score
    CASE
        WHEN g % 12 = 0 THEN (random() * 2 + 8)::integer -- Toronto Core demand
        WHEN g % 12 = 1 THEN (random() * 2 + 7)::integer -- Toronto Midtown demand
        WHEN g % 12 = 2 THEN (random() * 2 + 7)::integer -- Toronto West demand
        WHEN g % 12 = 3 THEN (random() * 2 + 7)::integer -- Toronto East demand
        WHEN g % 12 = 4 THEN (random() * 2 + 6)::integer -- Mississauga demand
        WHEN g % 12 = 5 THEN (random() * 2 + 6)::integer -- Brampton demand
        WHEN g % 12 = 6 THEN (random() * 2 + 6)::integer -- Vaughan demand
        WHEN g % 12 = 7 THEN (random() * 2 + 6)::integer -- Markham demand
        WHEN g % 12 = 8 THEN (random() * 2 + 6)::integer -- Richmond Hill demand
        WHEN g % 12 = 9 THEN (random() * 2 + 6)::integer -- Oakville demand
        WHEN g % 12 = 10 THEN (random() * 2 + 6)::integer -- Burlington demand
        ELSE (random() * 2 + 6)::integer -- Pickering/Ajax demand
    END,
    -- Risk score
    CASE
        WHEN g % 12 = 0 THEN (random() * 2 + 7)::integer -- Toronto Core risk
        WHEN g % 12 = 1 THEN (random() * 2 + 7)::integer -- Toronto Midtown risk
        WHEN g % 12 = 2 THEN (random() * 2 + 6)::integer -- Toronto West risk
        WHEN g % 12 = 3 THEN (random() * 2 + 6)::integer -- Toronto East risk
        WHEN g % 12 = 4 THEN (random() * 2 + 6)::integer -- Mississauga risk
        WHEN g % 12 = 5 THEN (random() * 2 + 5)::integer -- Brampton risk
        WHEN g % 12 = 6 THEN (random() * 2 + 6)::integer -- Vaughan risk
        WHEN g % 12 = 7 THEN (random() * 2 + 6)::integer -- Markham risk
        WHEN g % 12 = 8 THEN (random() * 2 + 7)::integer -- Richmond Hill risk
        WHEN g % 12 = 9 THEN (random() * 2 + 7)::integer -- Oakville risk
        WHEN g % 12 = 10 THEN (random() * 2 + 6)::integer -- Burlington risk
        ELSE (random() * 2 + 6)::integer -- Pickering/Ajax risk
    END,
    -- Performance score
    CASE
        WHEN g % 12 = 0 THEN (random() * 2 + 7)::integer -- Toronto Core performance
        WHEN g % 12 = 1 THEN (random() * 2 + 6)::integer -- Toronto Midtown performance
        WHEN g % 12 = 2 THEN (random() * 2 + 6)::integer -- Toronto West performance
        WHEN g % 12 = 3 THEN (random() * 2 + 6)::integer -- Toronto East performance
        WHEN g % 12 = 4 THEN (random() * 2 + 6)::integer -- Mississauga performance
        WHEN g % 12 = 5 THEN (random() * 2 + 7)::integer -- Brampton performance
        WHEN g % 12 = 6 THEN (random() * 2 + 6)::integer -- Vaughan performance
        WHEN g % 12 = 7 THEN (random() * 2 + 6)::integer -- Markham performance
        WHEN g % 12 = 8 THEN (random() * 2 + 6)::integer -- Richmond Hill performance
        WHEN g % 12 = 9 THEN (random() * 2 + 6)::integer -- Oakville performance
        WHEN g % 12 = 10 THEN (random() * 2 + 6)::integer -- Burlington performance
        ELSE (random() * 2 + 6)::integer -- Pickering/Ajax performance
    END,
    -- Overall score (weighted average of all metrics)
    CASE
        WHEN g % 12 = 0 THEN (random() * 2 + 7)::integer -- Toronto Core overall
        WHEN g % 12 = 1 THEN (random() * 2 + 7)::integer -- Toronto Midtown overall
        WHEN g % 12 = 2 THEN (random() * 2 + 7)::integer -- Toronto West overall
        WHEN g % 12 = 3 THEN (random() * 2 + 7)::integer -- Toronto East overall
        WHEN g % 12 = 4 THEN (random() * 2 + 6)::integer -- Mississauga overall
        WHEN g % 12 = 5 THEN (random() * 2 + 6)::integer -- Brampton overall
        WHEN g % 12 = 6 THEN (random() * 2 + 6)::integer -- Vaughan overall
        WHEN g % 12 = 7 THEN (random() * 2 + 6)::integer -- Markham overall
        WHEN g % 12 = 8 THEN (random() * 2 + 6)::integer -- Richmond Hill overall
        WHEN g % 12 = 9 THEN (random() * 2 + 6)::integer -- Oakville overall
        WHEN g % 12 = 10 THEN (random() * 2 + 6)::integer -- Burlington overall
        ELSE (random() * 2 + 6)::integer -- Pickering/Ajax overall
    END,
    NOW(), NOW()
FROM generate_series(1, 350) AS g;

-- Add more location scores to reach 500+ entries total
INSERT INTO location_scores (
    latitude, longitude, address, overall_score, performance_score, risk_score,
    demand_score, supply_score, cap_rate, appreciation, irr, five_year_total_return,
    average_house_price, property_tax, neighborhood_change, created_at, updated_at
)
SELECT
    -- Generate location coordinates based on area index
    CASE
        WHEN i % 12 = 0 THEN (random() * (43.700 - 43.630) + 43.630)::numeric(8,4) -- Toronto Core
        WHEN i % 12 = 1 THEN (random() * (43.730 - 43.680) + 43.680)::numeric(8,4) -- Toronto Midtown
        WHEN i % 12 = 2 THEN (random() * (43.680 - 43.630) + 43.630)::numeric(8,4) -- Toronto West
        WHEN i % 12 = 3 THEN (random() * (43.720 - 43.660) + 43.660)::numeric(8,4) -- Toronto East
        WHEN i % 12 = 4 THEN (random() * (43.620 - 43.560) + 43.560)::numeric(8,4) -- Mississauga
        WHEN i % 12 = 5 THEN (random() * (43.760 - 43.680) + 43.680)::numeric(8,4) -- Brampton
        WHEN i % 12 = 6 THEN (random() * (43.850 - 43.770) + 43.770)::numeric(8,4) -- Vaughan
        WHEN i % 12 = 7 THEN (random() * (43.880 - 43.820) + 43.820)::numeric(8,4) -- Markham
        WHEN i % 12 = 8 THEN (random() * (43.910 - 43.840) + 43.840)::numeric(8,4) -- Richmond Hill
        WHEN i % 12 = 9 THEN (random() * (43.480 - 43.390) + 43.390)::numeric(8,4) -- Oakville
        WHEN i % 12 = 10 THEN (random() * (43.580 - 43.530) + 43.530)::numeric(8,4) -- Burlington
        ELSE (random() * (43.670 - 43.610) + 43.610)::numeric(8,4) -- Pickering/Ajax
    END,
    CASE
        WHEN i % 12 = 0 THEN (random() * (-79.350 - (-79.420)) + (-79.420))::numeric(8,4) -- Toronto Core
        WHEN i % 12 = 1 THEN (random() * (-79.380 - (-79.430)) + (-79.430))::numeric(8,4) -- Toronto Midtown
        WHEN i % 12 = 2 THEN (random() * (-79.420 - (-79.490)) + (-79.490))::numeric(8,4) -- Toronto West
        WHEN i % 12 = 3 THEN (random() * (-79.290 - (-79.360)) + (-79.360))::numeric(8,4) -- Toronto East
        WHEN i % 12 = 4 THEN (random() * (-79.580 - (-79.650)) + (-79.650))::numeric(8,4) -- Mississauga
        WHEN i % 12 = 5 THEN (random() * (-79.700 - (-79.820)) + (-79.820))::numeric(8,4) -- Brampton
        WHEN i % 12 = 6 THEN (random() * (-79.480 - (-79.570)) + (-79.570))::numeric(8,4) -- Vaughan
        WHEN i % 12 = 7 THEN (random() * (-79.290 - (-79.370)) + (-79.370))::numeric(8,4) -- Markham
        WHEN i % 12 = 8 THEN (random() * (-79.380 - (-79.460)) + (-79.460))::numeric(8,4) -- Richmond Hill
        WHEN i % 12 = 9 THEN (random() * (-79.650 - (-79.730)) + (-79.730))::numeric(8,4) -- Oakville
        WHEN i % 12 = 10 THEN (random() * (-79.750 - (-79.850)) + (-79.850))::numeric(8,4) -- Burlington
        ELSE (random() * (-79.050 - (-79.150)) + (-79.150))::numeric(8,4) -- Pickering/Ajax
    END,
    -- Generate neighborhood names
    CASE
        WHEN i % 12 = 0 THEN
            'Neighborhood ' || (i % 20 + 1)::text || ' - Downtown Toronto'
        WHEN i % 12 = 1 THEN
            'Neighborhood ' || (i % 20 + 1)::text || ' - Midtown Toronto'
        WHEN i % 12 = 2 THEN
            'Neighborhood ' || (i % 20 + 1)::text || ' - West Toronto'
        WHEN i % 12 = 3 THEN
            'Neighborhood ' || (i % 20 + 1)::text || ' - East Toronto'
        WHEN i % 12 = 4 THEN
            'Neighborhood ' || (i % 20 + 1)::text || ' - Mississauga'
        WHEN i % 12 = 5 THEN
            'Neighborhood ' || (i % 20 + 1)::text || ' - Brampton'
        WHEN i % 12 = 6 THEN
            'Neighborhood ' || (i % 20 + 1)::text || ' - Vaughan'
        WHEN i % 12 = 7 THEN
            'Neighborhood ' || (i % 20 + 1)::text || ' - Markham'
        WHEN i % 12 = 8 THEN
            'Neighborhood ' || (i % 20 + 1)::text || ' - Richmond Hill'
        WHEN i % 12 = 9 THEN
            'Neighborhood ' || (i % 20 + 1)::text || ' - Oakville'
        WHEN i % 12 = 10 THEN
            'Neighborhood ' || (i % 20 + 1)::text || ' - Burlington'
        ELSE
            'Neighborhood ' || (i % 20 + 1)::text || ' - Pickering/Ajax'
    END,
    CASE
        WHEN i % 10 = 0 THEN (random() * 1.0 + 2.0)::numeric(8,2) -- Toronto Core change
        WHEN i % 10 = 1 THEN (random() * 1.0 + 1.9)::numeric(8,2) -- Toronto Midtown change
        WHEN i % 10 = 2 THEN (random() * 1.0 + 2.1)::numeric(8,2) -- Toronto West change
        WHEN i % 10 = 3 THEN (random() * 1.0 + 2.2)::numeric(8,2) -- Toronto East change
        WHEN i % 10 = 4 THEN (random() * 1.0 + 1.9)::numeric(8,2) -- Mississauga change
        WHEN i % 10 = 5 THEN (random() * 1.0 + 2.0)::numeric(8,2) -- Brampton change
        WHEN i % 10 = 6 THEN (random() * 1.0 + 1.8)::numeric(8,2) -- Vaughan change
        WHEN i % 10 = 7 THEN (random() * 1.0 + 1.7)::numeric(8,2) -- Markham change
        WHEN i % 10 = 8 THEN (random() * 1.0 + 1.6)::numeric(8,2) -- Richmond Hill change
        ELSE (random() * 1.0 + 1.5)::numeric(8,2) -- Oakville change
	END,
    CASE
        WHEN i % 10 = 0 THEN 0.61 -- Toronto
        WHEN i % 10 = 1 THEN 0.61 -- Toronto
        WHEN i % 10 = 2 THEN 0.61 -- Toronto
        WHEN i % 10 = 3 THEN 0.61 -- Toronto
        WHEN i % 10 = 4 THEN (random() * 0.05 + 0.80)::numeric(8,2) -- Mississauga
        WHEN i % 10 = 5 THEN (random() * 0.05 + 1.00)::numeric(8,2) -- Brampton
        WHEN i % 10 = 6 THEN (random() * 0.05 + 0.65)::numeric(8,2) -- Vaughan
        WHEN i % 10 = 7 THEN (random() * 0.05 + 0.65)::numeric(8,2) -- Markham
        WHEN i % 10 = 8 THEN (random() * 0.05 + 0.65)::numeric(8,2) -- Richmond Hill
        ELSE (random() * 0.05 + 0.72)::numeric(8,2) -- Oakville
	END,
    CASE
        WHEN i % 10 = 0 THEN (random() * 300000 + 800000)::numeric(12,2) -- Toronto Core
        WHEN i % 10 = 1 THEN (random() * 300000 + 850000)::numeric(12,2) -- Toronto Midtown
        WHEN i % 10 = 2 THEN (random() * 300000 + 780000)::numeric(12,2) -- Toronto West
        WHEN i % 10 = 3 THEN (random() * 300000 + 750000)::numeric(12,2) -- Toronto East
        WHEN i % 10 = 4 THEN (random() * 250000 + 650000)::numeric(12,2) -- Mississauga
        WHEN i % 10 = 5 THEN (random() * 200000 + 580000)::numeric(12,2) -- Brampton
        WHEN i % 10 = 6 THEN (random() * 250000 + 700000)::numeric(12,2) -- Vaughan
        WHEN i % 10 = 7 THEN (random() * 250000 + 720000)::numeric(12,2) -- Markham
        WHEN i % 10 = 8 THEN (random() * 300000 + 750000)::numeric(12,2) -- Richmond Hill
        ELSE (random() * 300000 + 780000)::numeric(12,2) -- Oakville
    END,
	CASE
        WHEN i % 10 = 0 THEN (random() * 5.0 + 35.0)::numeric(8,2) -- Toronto Core total return
        WHEN i % 10 = 1 THEN (random() * 5.0 + 34.0)::numeric(8,2) -- Toronto Midtown total return
        WHEN i % 10 = 2 THEN (random() * 5.0 + 33.0)::numeric(8,2) -- Toronto West total return
        WHEN i % 10 = 3 THEN (random() * 5.0 + 34.0)::numeric(8,2) -- Toronto East total return
        WHEN i % 10 = 4 THEN (random() * 5.0 + 32.0)::numeric(8,2) -- Mississauga total return
        WHEN i % 10 = 5 THEN (random() * 5.0 + 33.0)::numeric(8,2) -- Brampton total return
        WHEN i % 10 = 6 THEN (random() * 5.0 + 33.0)::numeric(8,2) -- Vaughan total return
        WHEN i % 10 = 7 THEN (random() * 5.0 + 32.0)::numeric(8,2) -- Markham total return
        WHEN i % 10 = 8 THEN (random() * 5.0 + 32.0)::numeric(8,2) -- Richmond Hill total return
        ELSE (random() * 5.0 + 31.0)::numeric(8,2) -- Oakville total return
    END,
	CASE
        WHEN i % 10 = 0 THEN (random() * 1.0 + 7.3)::numeric(8,2) -- Toronto Core IRR
        WHEN i % 10 = 1 THEN (random() * 1.0 + 7.2)::numeric(8,2) -- Toronto Midtown IRR
        WHEN i % 10 = 2 THEN (random() * 1.0 + 7.3)::numeric(8,2) -- Toronto West IRR
        WHEN i % 10 = 3 THEN (random() * 1.0 + 7.4)::numeric(8,2) -- Toronto East IRR
        WHEN i % 10 = 4 THEN (random() * 1.0 + 7.0)::numeric(8,2) -- Mississauga IRR
        WHEN i % 10 = 5 THEN (random() * 1.0 + 7.2)::numeric(8,2) -- Brampton IRR
        WHEN i % 10 = 6 THEN (random() * 1.0 + 7.1)::numeric(8,2) -- Vaughan IRR
        WHEN i % 10 = 7 THEN (random() * 1.0 + 7.0)::numeric(8,2) -- Markham IRR
        WHEN i % 10 = 8 THEN (random() * 1.0 + 6.9)::numeric(8,2) -- Richmond Hill IRR
        ELSE (random() * 1.0 + 6.8)::numeric(8,2) -- Oakville IRR
    END,
	CASE
        WHEN i % 10 = 0 THEN (random() * 1.0 + 4.5)::numeric(8,2) -- Toronto Core appreciation
        WHEN i % 10 = 1 THEN (random() * 1.0 + 4.4)::numeric(8,2) -- Toronto Midtown appreciation
        WHEN i % 10 = 2 THEN (random() * 1.0 + 4.3)::numeric(8,2) -- Toronto West appreciation
        WHEN i % 10 = 3 THEN (random() * 1.0 + 4.4)::numeric(8,2) -- Toronto East appreciation
        WHEN i % 10 = 4 THEN (random() * 1.5 + 3.8)::numeric(8,2) -- Mississauga appreciation
        WHEN i % 10 = 5 THEN (random() * 1.5 + 4.0)::numeric(8,2) -- Brampton appreciation
        WHEN i % 10 = 6 THEN (random() * 1.5 + 4.1)::numeric(8,2) -- Vaughan appreciation
        WHEN i % 10 = 7 THEN (random() * 1.5 + 4.0)::numeric(8,2) -- Markham appreciation
        WHEN i % 10 = 8 THEN (random() * 1.5 + 3.9)::numeric(8,2) -- Richmond Hill appreciation
        ELSE (random() * 1.5 + 3.7)::numeric(8,2) -- Oakville appreciation
    END,
	CASE
        WHEN (random() * 100)::integer % 10 = 0 THEN 'M5V 2N4'
        WHEN (random() * 100)::integer % 10 = 1 THEN 'M5H 1J9'
        WHEN (random() * 100)::integer % 10 = 2 THEN 'M5G 1Z8'
        WHEN (random() * 100)::integer % 10 = 3 THEN 'M4W 1A8'
        WHEN (random() * 100)::integer % 10 = 4 THEN 'M5R 1B9'
        WHEN (random() * 100)::integer % 10 = 5 THEN 'M4Y 2H1'
        WHEN (random() * 100)::integer % 10 = 6 THEN 'M5T 1R4'
        WHEN (random() * 100)::integer % 10 = 7 THEN 'M4S 2Y2'
        WHEN (random() * 100)::integer % 10 = 8 THEN 'M6G 1A5'
        ELSE 'M5J 2N8'
    END,
    CASE
        WHEN (random() * 100)::integer % 10 <= 3 THEN 1
        WHEN (random() * 100)::integer % 10 <= 7 THEN 2
        WHEN (random() * 100)::integer % 10 <= 9 THEN 3
        ELSE 4
    END,
    CASE
        WHEN (random() * 100)::integer % 10 <= 2 THEN 1
        WHEN (random() * 100)::integer % 10 <= 4 THEN 1.5
        WHEN (random() * 100)::integer % 10 <= 7 THEN 2
        WHEN (random() * 100)::integer % 10 <= 9 THEN 2.5
        ELSE 3
    END,
    CASE
        WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 200 + 450)::integer
        WHEN (random() * 100)::integer % 10 <= 6 THEN (random() * 200 + 650)::integer
        WHEN (random() * 100)::integer % 10 <= 9 THEN (random() * 400 + 850)::integer
        ELSE (random() * 700 + 1200)::integer
    END,
    CASE
        WHEN (random() * 100)::integer % 10 <= 1 THEN (random() * 20 + 1980)::integer
        WHEN (random() * 100)::integer % 10 <= 3 THEN (random() * 10 + 2000)::integer
        WHEN (random() * 100)::integer % 10 <= 7 THEN (random() * 10 + 2010)::integer
        ELSE (random() * 5 + 2020)::integer
    END,
    CASE
        WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 100000 + 500000)::numeric(12,2)
        WHEN (random() * 100)::integer % 10 <= 5 THEN (random() * 200000 + 700000)::numeric(12,2)
        WHEN (random() * 100)::integer % 10 <= 8 THEN (random() * 300000 + 900000)::numeric(12,2)
        ELSE (random() * 600000 + 1200000)::numeric(12,2)
    END,
    CASE
        WHEN (random() * 10)::integer % 10 <= 7 THEN 'Active'
        WHEN (random() * 10)::integer % 10 <= 9 THEN 'Pending'
        ELSE 'Sold'
    END,
    (random() * (43.720 - 43.630) + 43.630)::numeric(8,4),
    (random() * (-79.350 - (-79.420)) + (-79.420))::numeric(8,4),
    (random() * 1.0 + 2.3)::numeric(4,2),
    (random() * 2.0 + 3.5)::numeric(4,2),
    (random() * 2.0 + 3.2)::numeric(4,2),
    CASE
        WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 500 + 1800)::numeric(10,2)
        WHEN (random() * 100)::integer % 10 <= 5 THEN (random() * 700 + 2300)::numeric(10,2)
        WHEN (random() * 100)::integer % 10 <= 8 THEN (random() * 900 + 3000)::numeric(10,2)
        ELSE (random() * 1200 + 3900)::numeric(10,2)
    END,
    CASE
        WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 2000 + 7000)::numeric(10,2)
        WHEN (random() * 100)::integer % 10 <= 5 THEN (random() * 3000 + 9000)::numeric(10,2)
        WHEN (random() * 100)::integer % 10 <= 8 THEN (random() * 4000 + 12000)::numeric(10,2)
        ELSE (random() * 6000 + 16000)::numeric(10,2)
    END,
    'https://example.com/images/toronto-condo' || (1 + (random() * 20)::integer)::text || '.jpg',
    CASE
        WHEN (random() * 100)::integer % 5 = 0 THEN 'Luxurious condo in the heart of downtown Toronto with stunning city views. Modern finishes throughout, gourmet kitchen, and floor-to-ceiling windows. Building offers premium amenities including 24-hour concierge, fitness center, and rooftop terrace.'
        WHEN (random() * 100)::integer % 5 = 1 THEN 'Bright and spacious unit in a prime Toronto location. Open concept layout with updated kitchen, engineered hardwood floors, and private balcony. Steps to transit, restaurants, and shopping.'
        WHEN (random() * 100)::integer % 5 = 2 THEN 'Modern condo with excellent investment potential. Well-designed floor plan with high-end finishes, stainless steel appliances, and city views. Building amenities include gym, party room, and 24-hour security.'
        WHEN (random() * 100)::integer % 5 = 3 THEN 'Stylish unit in a sought-after Toronto neighborhood. Features include updated kitchen with quartz countertops, spa-like bathroom, and spacious living area. Close to parks, shops, and public transportation.'
        ELSE 'Contemporary condo with excellent location and amenities. Open concept design with premium finishes, large windows, and private outdoor space. Building offers concierge service, fitness facilities, and entertainment spaces.'
    END,
    NOW(), NOW()
FROM generate_series(1, 120) as i;

-- GTA (Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville)
INSERT INTO properties (
    address, city, state, zip_code, bedrooms, bathrooms, square_feet, year_built,
    list_price, status, latitude, longitude, cap_rate, appreciation_rate,
    cash_on_cash_return, monthly_rent, yearly_expenses, image_url, description,
    created_at, updated_at
)
SELECT
    CASE
        WHEN i % 6 = 0 THEN
            (1000 + (random() * 5000)::integer)::text ||
            CASE
                WHEN (random() * 3)::integer = 0 THEN ' Hurontario Street, Unit '
                WHEN (random() * 3)::integer = 1 THEN ' Burnhamthorpe Road, Unit '
                ELSE ' Confederation Parkway, Unit '
            END || (100 + (random() * 2500)::integer)::text
        WHEN i % 6 = 1 THEN
            (1000 + (random() * 5000)::integer)::text ||
            CASE
                WHEN (random() * 3)::integer = 0 THEN ' Main Street, Unit '
                WHEN (random() * 3)::integer = 1 THEN ' Queen Street, Unit '
                ELSE ' Kennedy Road, Unit '
            END || (100 + (random() * 2000)::integer)::text
        WHEN i % 6 = 2 THEN
            (1000 + (random() * 3000)::integer)::text ||
            CASE
                WHEN (random() * 3)::integer = 0 THEN ' Highway 7, Unit '
                WHEN (random() * 3)::integer = 1 THEN ' Jane Street, Unit '
                ELSE ' Dufferin Street, Unit '
            END || (100 + (random() * 2000)::integer)::text
        WHEN i % 6 = 3 THEN
            (1000 + (random() * 4000)::integer)::text ||
            CASE
                WHEN (random() * 3)::integer = 0 THEN ' Highway 7, Unit '
                WHEN (random() * 3)::integer = 1 THEN ' Yonge Street, Unit '
                ELSE ' Warden Avenue, Unit '
            END || (100 + (random() * 2000)::integer)::text
        WHEN i % 6 = 4 THEN
            (1000 + (random() * 3000)::integer)::text ||
            CASE
                WHEN (random() * 3)::integer = 0 THEN ' Yonge Street, Unit '
                WHEN (random() * 3)::integer = 1 THEN ' Bayview Avenue, Unit '
                ELSE ' Highway 7, Unit '
            END || (100 + (random() * 1500)::integer)::text
        ELSE
            (1000 + (random() * 3000)::integer)::text ||
            CASE
                WHEN (random() * 3)::integer = 0 THEN ' Trafalgar Road, Unit '
                WHEN (random() * 3)::integer = 1 THEN ' Dundas Street, Unit '
                ELSE ' Lakeshore Road, Unit '
            END || (100 + (random() * 1500)::integer)::text
    END,
    CASE
        WHEN i % 6 = 0 THEN 'Mississauga'
        WHEN i % 6 = 1 THEN 'Brampton'
        WHEN i % 6 = 2 THEN 'Vaughan'
        WHEN i % 6 = 3 THEN 'Markham'
        WHEN i % 6 = 4 THEN 'Richmond Hill'
        ELSE 'Oakville'
    END,
    'ON',
    CASE
        WHEN i % 6 = 0 THEN
            CASE
                WHEN (random() * 3)::integer = 0 THEN 'L5B ' || (random() * 9 + 1)::text || 'M' || (random() * 9 + 1)::text
                WHEN (random() * 3)::integer = 1 THEN 'L5R ' || (random() * 9 + 1)::text || 'K' || (random() * 9 + 1)::text
                ELSE 'L4Z ' || (random() * 9 + 1)::text || 'W' || (random() * 9 + 1)::text
            END
        WHEN i % 6 = 1 THEN
            CASE
                WHEN (random() * 3)::integer = 0 THEN 'L6Y ' || (random() * 9 + 1)::text || 'R' || (random() * 9 + 1)::text
                WHEN (random() * 3)::integer = 1 THEN 'L6T ' || (random() * 9 + 1)::text || 'L' || (random() * 9 + 1)::text
                ELSE 'L6X ' || (random() * 9 + 1)::text || 'V' || (random() * 9 + 1)::text
            END
        WHEN i % 6 = 2 THEN
            CASE
                WHEN (random() * 3)::integer = 0 THEN 'L4K ' || (random() * 9 + 1)::text || 'G' || (random() * 9 + 1)::text
                WHEN (random() * 3)::integer = 1 THEN 'L4L ' || (random() * 9 + 1)::text || 'J' || (random() * 9 + 1)::text
                ELSE 'L6A ' || (random() * 9 + 1)::text || 'B' || (random() * 9 + 1)::text
            END
        WHEN i % 6 = 3 THEN
            CASE
                WHEN (random() * 3)::integer = 0 THEN 'L3R ' || (random() * 9 + 1)::text || 'W' || (random() * 9 + 1)::text
                WHEN (random() * 3)::integer = 1 THEN 'L3P ' || (random() * 9 + 1)::text || 'K' || (random() * 9 + 1)::text
                ELSE 'L3T ' || (random() * 9 + 1)::text || 'G' || (random() * 9 + 1)::text
            END
        WHEN i % 6 = 4 THEN
            CASE
                WHEN (random() * 3)::integer = 0 THEN 'L4B ' || (random() * 9 + 1)::text || 'M' || (random() * 9 + 1)::text
                WHEN (random() * 3)::integer = 1 THEN 'L4C ' || (random() * 9 + 1)::text || 'K' || (random() * 9 + 1)::text
                ELSE 'L4E ' || (random() * 9 + 1)::text || 'J' || (random() * 9 + 1)::text
            END
        ELSE
            CASE
                WHEN (random() * 3)::integer = 0 THEN 'L6H ' || (random() * 9 + 1)::text || 'M' || (random() * 9 + 1)::text
                WHEN (random() * 3)::integer = 1 THEN 'L6J ' || (random() * 9 + 1)::text || 'G' || (random() * 9 + 1)::text
                ELSE 'L6L ' || (random() * 9 + 1)::text || 'K' || (random() * 9 + 1)::text
            END
    END,
    CASE
        WHEN (random() * 100)::integer % 10 <= 3 THEN 1
        WHEN (random() * 100)::integer % 10 <= 7 THEN 2
        WHEN (random() * 100)::integer % 10 <= 9 THEN 3
        ELSE 4
    END,
    CASE
        WHEN (random() * 100)::integer % 10 <= 2 THEN 1
        WHEN (random() * 100)::integer % 10 <= 4 THEN 1.5
        WHEN (random() * 100)::integer % 10 <= 7 THEN 2
        WHEN (random() * 100)::integer % 10 <= 9 THEN 2.5
        ELSE 3
    END,
    CASE
        WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 200 + 500)::integer
        WHEN (random() * 100)::integer % 10 <= 6 THEN (random() * 200 + 700)::integer
        WHEN (random() * 100)::integer % 10 <= 9 THEN (random() * 400 + 900)::integer
        ELSE (random() * 700 + 1300)::integer
    END,
    CASE
        WHEN (random() * 100)::integer % 10 <= 1 THEN (random() * 20 + 1980)::integer
        WHEN (random() * 100)::integer % 10 <= 3 THEN (random() * 10 + 2000)::integer
        WHEN (random() * 100)::integer % 10 <= 7 THEN (random() * 10 + 2010)::integer
        ELSE (random() * 5 + 2020)::integer
    END,
    CASE
        WHEN i % 6 = 0 THEN -- Mississauga
            CASE
                WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 100000 + 450000)::numeric(12,2)
                WHEN (random() * 100)::integer % 10 <= 5 THEN (random() * 150000 + 550000)::numeric(12,2)
                WHEN (random() * 100)::integer % 10 <= 8 THEN (random() * 250000 + 700000)::numeric(12,2)
                ELSE (random() * 400000 + 950000)::numeric(12,2)
            END
        WHEN i % 6 = 1 THEN -- Brampton
            CASE
                WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 100000 + 420000)::numeric(12,2)
                WHEN (random() * 100)::integer % 10 <= 5 THEN (random() * 150000 + 520000)::numeric(12,2)
                WHEN (random() * 100)::integer % 10 <= 8 THEN (random() * 200000 + 670000)::numeric(12,2)
                ELSE (random() * 300000 + 870000)::numeric(12,2)
            END
        WHEN i % 6 = 2 THEN -- Vaughan
            CASE
                WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 100000 + 470000)::numeric(12,2)
                WHEN (random() * 100)::integer % 10 <= 5 THEN (random() * 150000 + 580000)::numeric(12,2)
                WHEN (random() * 100)::integer % 10 <= 8 THEN (random() * 250000 + 730000)::numeric(12,2)
                ELSE (random() * 400000 + 980000)::numeric(12,2)
            END
        WHEN i % 6 = 3 THEN -- Markham
            CASE
                WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 100000 + 480000)::numeric(12,2)
                WHEN (random() * 100)::integer % 10 <= 5 THEN (random() * 150000 + 590000)::numeric(12,2)
                WHEN (random() * 100)::integer % 10 <= 8 THEN (random() * 250000 + 740000)::numeric(12,2)
                ELSE (random() * 400000 + 990000)::numeric(12,2)
            END
        WHEN i % 6 = 4 THEN -- Richmond Hill
            CASE
                WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 100000 + 490000)::numeric(12,2)
                WHEN (random() * 100)::integer % 10 <= 5 THEN (random() * 150000 + 600000)::numeric(12,2)
                WHEN (random() * 100)::integer % 10 <= 8 THEN (random() * 250000 + 750000)::numeric(12,2)
                ELSE (random() * 400000 + 1000000)::numeric(12,2)
            END
        ELSE -- Oakville
            CASE
                WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 100000 + 520000)::numeric(12,2)
                WHEN (random() * 100)::integer % 10 <= 5 THEN (random() * 150000 + 620000)::numeric(12,2)
                WHEN (random() * 100)::integer % 10 <= 8 THEN (random() * 250000 + 770000)::numeric(12,2)
                ELSE (random() * 500000 + 1020000)::numeric(12,2)
            END
    END,
    CASE
        WHEN (random() * 10)::integer % 10 <= 7 THEN 'Active'
        WHEN (random() * 10)::integer % 10 <= 9 THEN 'Pending'
        ELSE 'Sold'
    END,
    CASE
        WHEN i % 6 = 0 THEN (random() * (43.62 - 43.56) + 43.56)::numeric(8,4) -- Mississauga
        WHEN i % 6 = 1 THEN (random() * (43.75 - 43.65) + 43.65)::numeric(8,4) -- Brampton
        WHEN i % 6 = 2 THEN (random() * (43.85 - 43.77) + 43.77)::numeric(8,4) -- Vaughan
        WHEN i % 6 = 3 THEN (random() * (43.90 - 43.82) + 43.82)::numeric(8,4) -- Markham
        WHEN i % 6 = 4 THEN (random() * (43.90 - 43.85) + 43.85)::numeric(8,4) -- Richmond Hill
        ELSE (random() * (43.48 - 43.42) + 43.42)::numeric(8,4) -- Oakville
    END,
    CASE
        WHEN i % 6 = 0 THEN (random() * (-79.58 - (-79.65)) + (-79.65))::numeric(8,4) -- Mississauga
        WHEN i % 6 = 1 THEN (random() * (-79.70 - (-79.78)) + (-79.78))::numeric(8,4) -- Brampton
        WHEN i % 6 = 2 THEN (random() * (-79.48 - (-79.56)) + (-79.56))::numeric(8,4) -- Vaughan
        WHEN i % 6 = 3 THEN (random() * (-79.28 - (-79.36)) + (-79.36))::numeric(8,4) -- Markham
        WHEN i % 6 = 4 THEN (random() * (-79.38 - (-79.46)) + (-79.46))::numeric(8,4) -- Richmond Hill
        ELSE (random() * (-79.65 - (-79.73)) + (-79.73))::numeric(8,4) -- Oakville
    END,
    CASE
        WHEN i % 6 = 0 THEN (random() * 1.0 + 3.1)::numeric(4,2) -- Mississauga
        WHEN i % 6 = 1 THEN (random() * 1.0 + 3.5)::numeric(4,2) -- Brampton
        WHEN i % 6 = 2 THEN (random() * 1.0 + 3.2)::numeric(4,2) -- Vaughan
        WHEN i % 6 = 3 THEN (random() * 1.0 + 3.2)::numeric(4,2) -- Markham
        WHEN i % 6 = 4 THEN (random() * 1.0 + 3.0)::numeric(4,2) -- Richmond Hill
        ELSE (random() * 1.0 + 2.8)::numeric(4,2) -- Oakville
    END,
    CASE
        WHEN i % 6 = 0 THEN (random() * 1.5 + 3.8)::numeric(4,2) -- Mississauga
        WHEN i % 6 = 1 THEN (random() * 1.5 + 4.0)::numeric(4,2) -- Brampton
        WHEN i % 6 = 2 THEN (random() * 1.5 + 4.1)::numeric(4,2) -- Vaughan
        WHEN i % 6 = 3 THEN (random() * 1.5 + 4.0)::numeric(4,2) -- Markham
        WHEN i % 6 = 4 THEN (random() * 1.5 + 3.9)::numeric(4,2) -- Richmond Hill
        ELSE (random() * 1.5 + 3.7)::numeric(4,2) -- Oakville
    END,
    CASE
        WHEN i % 6 = 0 THEN (random() * 1.5 + 5.0)::numeric(4,2) -- Mississauga
        WHEN i % 6 = 1 THEN (random() * 1.5 + 5.5)::numeric(4,2) -- Brampton
        WHEN i % 6 = 2 THEN (random() * 1.5 + 5.3)::numeric(4,2) -- Vaughan
        WHEN i % 6 = 3 THEN (random() * 1.5 + 5.2)::numeric(4,2) -- Markham
        WHEN i % 6 = 4 THEN (random() * 1.5 + 5.0)::numeric(4,2) -- Richmond Hill
        ELSE (random() * 1.5 + 4.8)::numeric(4,2) -- Oakville
    END,
    CASE
        WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 500 + 1600)::numeric(10,2)
        WHEN (random() * 100)::integer % 10 <= 5 THEN (random() * 700 + 2100)::numeric(10,2)
        WHEN (random() * 100)::integer % 10 <= 8 THEN (random() * 900 + 2800)::numeric(10,2)
        ELSE (random() * 1200 + 3700)::numeric(10,2)
    END,
    CASE
        WHEN (random() * 100)::integer % 10 <= 2 THEN (random() * 2000 + 6500)::numeric(10,2)
        WHEN (random() * 100)::integer % 10 <= 5 THEN (random() * 3000 + 8500)::numeric(10,2)
        WHEN (random() * 100)::integer % 10 <= 8 THEN (random() * 4000 + 11500)::numeric(10,2)
        ELSE (random() * 6000 + 15500)::numeric(10,2)
    END,
    CASE
        WHEN i % 6 = 0 THEN 'https://example.com/images/mississauga-condo' || (1 + (random() * 10)::integer)::text || '.jpg' -- Mississauga
        WHEN i % 6 = 1 THEN 'https://example.com/images/brampton-condo' || (1 + (random() * 10)::integer)::text || '.jpg' -- Brampton
        WHEN i % 6 = 2 THEN 'https://example.com/images/vaughan-condo' || (1 + (random() * 10)::integer)::text || '.jpg' -- Vaughan
        WHEN i % 6 = 3 THEN 'https://example.com/images/markham-condo' || (1 + (random() * 10)::integer)::text || '.jpg' -- Markham
        WHEN i % 6 = 4 THEN 'https://example.com/images/richmondhill-condo' || (1 + (random() * 10)::integer)::text || '.jpg' -- Richmond Hill
        ELSE 'https://example.com/images/oakville-condo' || (1 + (random() * 10)::integer)::text || '.jpg' -- Oakville
    END,
    CASE
        WHEN i % 6 = 0 THEN
            CASE
                WHEN (random() * 3)::integer = 0 THEN 'Modern condo in Mississauga City Centre with open concept layout and premium finishes. Enjoy building amenities including fitness center, party room, and rooftop terrace. Steps away from Square One Shopping Centre, Celebration Square, and transit hub.'
                WHEN (random() * 3)::integer = 1 THEN 'Bright and spacious unit in central Mississauga. Features include updated kitchen with stainless steel appliances, laminate flooring, and private balcony. Close to shopping, dining, and major highways.'
                ELSE 'Contemporary condo with excellent investment potential in Mississauga. Well-designed floor plan with quality finishes and ample storage. Building offers concierge service, gym, and social spaces. Minutes to Hurontario LRT.'
            END
        WHEN i % 6 = 1 THEN
            CASE
                WHEN (random() * 3)::integer = 0 THEN 'Stylish condo in downtown Brampton with modern updates throughout. Enjoy open concept living, updated kitchen, and private outdoor space. Walking distance to Garden Square, Rose Theatre, and Brampton GO station.'
                WHEN (random() * 3)::integer = 1 THEN 'Well-maintained unit in Brampton featuring spacious rooms, updated bathroom, and balcony with neighborhood views. Building amenities include gym and party room. Close to shopping, parks, and transit.'
                ELSE 'Move-in ready condo in a desirable Brampton neighborhood. Highlights include renovated kitchen, engineered flooring, and large windows. Great location near schools, shopping centers, and major highways.'
            END
        WHEN i % 6 = 2 THEN
            CASE
                WHEN (random() * 3)::integer = 0 THEN 'Luxury condo at Vaughan Metropolitan Centre with premium finishes and modern design. Enjoy gourmet kitchen, floor-to-ceiling windows, and private balcony. Building offers resort-style amenities. Steps to VMC subway station.'
                WHEN (random() * 3)::integer = 1 THEN 'Contemporary unit in Vaughan featuring open concept design, quartz countertops, and stainless steel appliances. Building amenities include fitness center, party room, and rooftop terrace. Close to shopping and dining.'
                ELSE 'Well-appointed condo in Vaughan with spacious layout, modern finishes, and private outdoor space. Building offers excellent amenities including concierge, gym, and social spaces. Minutes to highways and Vaughan Mills.'
            END
        WHEN i % 6 = 3 THEN
            CASE
                WHEN (random() * 3)::integer = 0 THEN 'Beautiful condo in the heart of Markham with modern finishes and functional layout. Features include updated kitchen, engineered hardwood, and private balcony. Close to shopping, dining, and transit.'
                WHEN (random() * 3)::integer = 1 THEN 'Spacious unit in Markham featuring open concept design, stainless steel appliances, and large windows. Building offers gym, party room, and guest suite. Minutes to major highways and amenities.'
                ELSE 'Well-maintained condo in a prime Markham location. Highlights include renovated kitchen and bathroom, laminate flooring, and private outdoor space. Steps to shopping, restaurants, and parks.'
            END
        WHEN i % 6 = 4 THEN
            CASE
                WHEN (random() * 3)::integer = 0 THEN 'Elegant condo in Richmond Hill with premium finishes and exceptional design. Features include gourmet kitchen, hardwood floors, and spacious balcony. Building offers concierge service and resort-style amenities.'
                WHEN (random() * 3)::integer = 1 THEN 'Modern unit in a well-maintained Richmond Hill building. Open concept layout with updated kitchen, engineered flooring, and private outdoor space. Close to shopping, dining, and transit options.'
                ELSE 'Bright and spacious condo in Richmond Hill with quality finishes throughout. Enjoy large windows, renovated bathroom, and functional layout. Building amenities include gym and party room. Steps to Yonge Street.'
            END
        ELSE
            CASE
                WHEN (random() * 3)::integer = 0 THEN 'Luxury condo in Oakville featuring high-end finishes and modern design. Highlights include gourmet kitchen, hardwood floors, and private balcony. Building offers premium amenities. Minutes to lakefront and downtown.'
                WHEN (random() * 3)::integer = 1 THEN 'Beautifully maintained unit in a desirable Oakville neighborhood. Features include updated kitchen, spacious rooms, and private outdoor space. Close to shopping, dining, and transit options.'
                ELSE 'Contemporary condo with excellent location in Oakville. Open concept design with quality finishes, large windows, and balcony. Building amenities include gym and social spaces. Steps to parks and shops.'
            END
    END,
    NOW(), NOW()
FROM generate_series(1, 370) as i;

-- Now, let's insert sample location scores for neighborhoods across the GTA

-- Toronto Core Neighborhoods
INSERT INTO location_scores (
    latitude, longitude, address, overall_score, performance_score, risk_score,
    demand_score, supply_score, cap_rate, appreciation, irr, five_year_total_return,
    average_house_price, property_tax, neighborhood_change, created_at, updated_at
) VALUES
-- Toronto Downtown
(43.6511, -79.3832, 'Financial District (Bay & King)', 8, 7, 8, 9, 6, 2.7, 4.8, 7.6, 38.5, 875000.00, 0.61, 2.3, NOW(), NOW()),
(43.6544, -79.3860, 'Entertainment District', 9, 8, 9, 9, 6, 2.9, 5.1, 8.1, 41.2, 920000.00, 0.61, 2.8, NOW(), NOW()),
(43.6645, -79.3842, 'Yorkville', 9, 7, 9, 10, 5, 2.5, 5.3, 7.9, 42.5, 1250000.00, 0.61, 2.5, NOW(), NOW()),
(43.6571, -79.3847, 'Church & Wellesley', 8, 7, 7, 9, 7, 3.1, 4.7, 7.8, 38.2, 780000.00, 0.61, 2.2, NOW(), NOW()),
(43.6423, -79.3772, 'St. Lawrence Market', 9, 8, 8, 9, 7, 3.0, 4.9, 7.9, 39.5, 850000.00, 0.61, 2.4, NOW(), NOW()),
(43.6479, -79.3801, 'Distillery District', 9, 8, 8, 9, 6, 2.8, 5.0, 7.8, 40.1, 890000.00, 0.61, 2.6, NOW(), NOW()),
(43.6389, -79.3853, 'Harbourfront', 8, 7, 7, 9, 5, 2.6, 4.6, 7.5, 37.8, 950000.00, 0.61, 2.1, NOW(), NOW()),
(43.6450, -79.4057, 'Liberty Village', 8, 7, 7, 9, 5, 3.2, 4.8, 7.9, 38.7, 750000.00, 0.61, 2.7, NOW(), NOW()),
(43.6641, -79.3731, 'Cabbagetown', 8, 7, 8, 8, 6, 3.1, 4.7, 7.7, 37.9, 820000.00, 0.61, 2.2, NOW(), NOW()),

-- Toronto Midtown
(43.7046, -79.3982, 'Yonge & Eglinton', 9, 8, 8, 9, 7, 3.0, 5.0, 7.9, 40.2, 875000.00, 0.61, 2.5, NOW(), NOW()),
(43.6991, -79.3894, 'Davisville Village', 8, 7, 8, 8, 7, 3.2, 4.8, 7.8, 38.5, 830000.00, 0.61, 2.3, NOW(), NOW()),
(43.6880, -79.4026, 'Forest Hill', 9, 7, 9, 8, 5, 2.4, 5.1, 7.6, 41.0, 1350000.00, 0.61, 2.0, NOW(), NOW()),
(43.7127, -79.3987, 'Lawrence Park', 8, 6, 9, 7, 5, 2.5, 4.9, 7.4, 39.5, 1250000.00, 0.61, 1.9, NOW(), NOW()),
(43.6959, -79.4113, 'Cedarvale', 8, 7, 8, 8, 6, 2.9, 4.8, 7.7, 38.8, 950000.00, 0.61, 2.2, NOW(), NOW()),

-- Toronto West
(43.6536, -79.4501, 'High Park', 8, 7, 8, 8, 6, 3.0, 4.7, 7.6, 37.9, 920000.00, 0.61, 2.2, NOW(), NOW()),
(43.6395, -79.4199, 'Parkdale', 7, 7, 6, 8, 7, 3.5, 4.5, 7.9, 36.8, 750000.00, 0.61, 2.7, NOW(), NOW()),
(43.6629, -79.4688, 'Junction', 8, 8, 7, 8, 6, 3.4, 4.9, 8.1, 39.3, 820000.00, 0.61, 2.8, NOW(), NOW()),
(43.6549, -79.4352, 'Roncesvalles', 8, 7, 8, 8, 6, 3.2, 4.8, 7.8, 38.5, 950000.00, 0.61, 2.4, NOW(), NOW()),
(43.6616, -79.4848, 'Bloor West Village', 8, 7, 8, 8, 6, 3.1, 4.7, 7.7, 37.9, 980000.00, 0.61, 2.2, NOW(), NOW()),

-- Toronto East
(43.6682, -79.3049, 'The Beaches', 8, 7, 8, 8, 6, 3.2, 4.7, 7.7, 37.9, 950000.00, 0.61, 2.2, NOW(), NOW()),
(43.6659, -79.3292, 'Leslieville', 8, 8, 7, 8, 6, 3.4, 4.9, 8.1, 39.3, 850000.00, 0.61, 2.7, NOW(), NOW()),
(43.6880, -79.3497, 'Danforth', 8, 7, 8, 8, 7, 3.3, 4.8, 7.9, 38.5, 880000.00, 0.61, 2.4, NOW(), NOW()),
(43.7056, -79.3236, 'East York', 7, 7, 7, 7, 7, 3.6, 4.6, 7.8, 37.2, 780000.00, 0.61, 2.3, NOW(), NOW()),
(43.6785, -79.3519, 'Riverdale', 8, 7, 8, 8, 6, 3.2, 4.8, 7.8, 38.5, 920000.00, 0.61, 2.3, NOW(), NOW()),

-- Mississauga
(43.5903, -79.6333, 'Mississauga City Centre', 8, 7, 8, 7, 6, 3.3, 4.5, 7.6, 36.5, 675000.00, 0.82, 2.4, NOW(), NOW()),
(43.5731, -79.6169, 'Port Credit', 8, 7, 8, 7, 5, 3.1, 4.6, 7.5, 37.2, 780000.00, 0.82, 2.2, NOW(), NOW()),
(43.5806, -79.6583, 'Erin Mills', 7, 7, 7, 7, 7, 3.5, 4.3, 7.4, 35.2, 650000.00, 0.82, 2.0, NOW(), NOW()),
(43.6056, -79.6519, 'Meadowvale', 7, 7, 7, 6, 7, 3.6, 4.2, 7.3, 34.5, 620000.00, 0.82, 1.9, NOW(), NOW()),
(43.5997, -79.6095, 'Cooksville', 7, 7, 6, 7, 7, 3.8, 4.1, 7.4, 33.8, 580000.00, 0.82, 2.1, NOW(), NOW()),

-- Brampton
(43.6859, -79.7600, 'Downtown Brampton', 7, 8, 6, 7, 8, 3.9, 4.3, 7.7, 35.1, 550000.00, 1.03, 2.2, NOW(), NOW()),
(43.7312, -79.7622, 'Bramalea', 7, 7, 6, 7, 8, 3.8, 4.2, 7.5, 34.5, 580000.00, 1.03, 2.0, NOW(), NOW()),
(43.7490, -79.7516, 'Springdale', 7, 7, 7, 6, 7, 3.7, 4.3, 7.6, 35.0, 620000.00, 1.03, 1.9, NOW(), NOW()),
(43.6982, -79.7811, 'Mount Pleasant', 8, 7, 7, 7, 7, 3.6, 4.5, 7.7, 36.5, 650000.00, 1.03, 2.1, NOW(), NOW()),
(43.7138, -79.8046, 'Credit Valley', 7, 7, 7, 6, 7, 3.7, 4.2, 7.4, 34.8, 640000.00, 1.03, 1.8, NOW(), NOW()),

-- Vaughan
(43.7976, -79.5373, 'Vaughan Metropolitan Centre', 8, 8, 7, 7, 6, 3.4, 4.7, 7.8, 38.2, 680000.00, 0.69, 2.6, NOW(), NOW()),
(43.8320, -79.5372, 'Maple', 7, 7, 7, 7, 6, 3.5, 4.4, 7.6, 36.0, 720000.00, 0.69, 2.1, NOW(), NOW()),
(43.8461, -79.5187, 'Thornhill (Vaughan)', 8, 7, 8, 7, 6, 3.3, 4.5, 7.6, 36.8, 750000.00, 0.69, 2.0, NOW(), NOW()),
(43.8234, -79.5650, 'Woodbridge', 7, 7, 7, 7, 6, 3.4, 4.3, 7.4, 35.5, 730000.00, 0.69, 1.9, NOW(), NOW()),
(43.7751, -79.5724, 'Kleinburg', 7, 6, 8, 6, 5, 3.0, 4.4, 7.2, 36.2, 920000.00, 0.69, 1.7, NOW(), NOW()),

-- Markham
(43.8577, -79.3377, 'Markham Centre', 8, 7, 8, 7, 6, 3.3, 4.5, 7.6, 36.8, 720000.00, 0.66, 2.2, NOW(), NOW()),
(43.8679, -79.3029, 'Unionville', 8, 7, 8, 7, 6, 3.2, 4.6, 7.7, 37.5, 780000.00, 0.66, 2.1, NOW(), NOW()),
(43.8427, -79.3629, 'Cornell', 7, 7, 7, 7, 7, 3.5, 4.4, 7.5, 35.8, 680000.00, 0.66, 2.0, NOW(), NOW()),
(43.8738, -79.3350, 'Berczy Village', 7, 7, 7, 7, 6, 3.4, 4.3, 7.4, 35.2, 690000.00, 0.66, 1.9, NOW(), NOW()),
(43.8236, -79.2991, 'Markham Village', 7, 7, 7, 7, 7, 3.6, 4.2, 7.3, 34.5, 650000.00, 0.66, 1.8, NOW(), NOW()),

-- Richmond Hill
(43.8828, -79.4402, 'Richmond Hill Centre', 8, 7, 8, 7, 6, 3.2, 4.5, 7.6, 36.8, 750000.00, 0.68, 2.1, NOW(), NOW()),
(43.8766, -79.4219, 'Bayview Hill', 8, 7, 8, 7, 5, 3.0, 4.6, 7.5, 37.5, 820000.00, 0.68, 1.9, NOW(), NOW()),
(43.8429, -79.4269, 'South Richvale', 7, 7, 7, 7, 6, 3.3, 4.4, 7.4, 36.0, 780000.00, 0.68, 2.0, NOW(), NOW()),
(43.9095, -79.4462, 'Oak Ridges', 7, 6, 7, 6, 6, 3.4, 4.2, 7.2, 34.5, 720000.00, 0.68, 1.7, NOW(), NOW()),
(43.8599, -79.4505, 'Mill Pond', 7, 7, 7, 7, 6, 3.2, 4.3, 7.3, 35.2, 750000.00, 0.68, 1.8, NOW(), NOW()),

-- Oakville
(43.4477, -79.6614, 'Downtown Oakville', 8, 7, 8, 7, 5, 2.9, 4.5, 7.4, 37.0, 920000.00, 0.75, 1.9, NOW(), NOW()),
(43.4673, -79.6875, 'Kerr Village', 7, 7, 7, 7, 6, 3.2, 4.3, 7.3, 35.5, 780000.00, 0.75, 2.0, NOW(), NOW()),
(43.4278, -79.7461, 'Uptown Core', 8, 7, 8, 7, 6, 3.1, 4.4, 7.5, 36.2, 820000.00, 0.75, 2.1, NOW(), NOW()),
(43.4521, -79.7204, 'Glen Abbey', 7, 7, 8, 6, 6, 3.0, 4.2, 7.2, 34.8, 850000.00, 0.75, 1.8, NOW(), NOW()),
(43.3943, -79.7103, 'Bronte', 7, 7, 7, 7, 6, 3.1, 4.3, 7.3, 35.5, 790000.00, 0.75, 1.9, NOW(), NOW());

-- Add additional location scores for specific areas across the GTA to reach approximately 500 total
INSERT INTO location_scores (
    latitude, longitude, address, overall_score, performance_score, risk_score,
    demand_score, supply_score, cap_rate, appreciation, irr, five_year_total_return,
    average_house_price, property_tax, neighborhood_change, created_at, updated_at
)
SELECT
    -- Generate location coordinates based on area index
    CASE
        WHEN i % 10 = 0 THEN (random() * (43.700 - 43.630) + 43.630)::numeric(8,4) -- Toronto Core
        WHEN i % 10 = 1 THEN (random() * (43.730 - 43.680) + 43.680)::numeric(8,4) -- Toronto Midtown
        WHEN i % 10 = 2 THEN (random() * (43.680 - 43.630) + 43.630)::numeric(8,4) -- Toronto West
        WHEN i % 10 = 3 THEN (random() * (43.720 - 43.660) + 43.660)::numeric(8,4) -- Toronto East
        WHEN i % 10 = 4 THEN (random() * (43.620 - 43.560) + 43.560)::numeric(8,4) -- Mississauga
        WHEN i % 10 = 5 THEN (random() * (43.760 - 43.680) + 43.680)::numeric(8,4) -- Brampton
        WHEN i % 10 = 6 THEN (random() * (43.850 - 43.770) + 43.770)::numeric(8,4) -- Vaughan
        WHEN i % 10 = 7 THEN (random() * (43.880 - 43.820) + 43.820)::numeric(8,4) -- Markham
        WHEN i % 10 = 8 THEN (random() * (43.910 - 43.840) + 43.840)::numeric(8,4) -- Richmond Hill
        ELSE (random() * (43.480 - 43.390) + 43.390)::numeric(8,4) -- Oakville
    END,
    CASE
        WHEN i % 10 = 0 THEN (random() * (-79.350 - (-79.420)) + (-79.420))::numeric(8,4) -- Toronto Core
        WHEN i % 10 = 1 THEN (random() * (-79.380 - (-79.430)) + (-79.430))::numeric(8,4) -- Toronto Midtown
        WHEN i % 10 = 2 THEN (random() * (-79.420 - (-79.490)) + (-79.490))::numeric(8,4) -- Toronto West
        WHEN i % 10 = 3 THEN (random() * (-79.290 - (-79.360)) + (-79.360))::numeric(8,4) -- Toronto East
        WHEN i % 10 = 4 THEN (random() * (-79.580 - (-79.650)) + (-79.650))::numeric(8,4) -- Mississauga
        WHEN i % 10 = 5 THEN (random() * (-79.700 - (-79.820)) + (-79.820))::numeric(8,4) -- Brampton
        WHEN i % 10 = 6 THEN (random() * (-79.480 - (-79.570)) + (-79.570))::numeric(8,4) -- Vaughan
        WHEN i % 10 = 7 THEN (random() * (-79.290 - (-79.370)) + (-79.370))::numeric(8,4) -- Markham
        WHEN i % 10 = 8 THEN (random() * (-79.380 - (-79.460)) + (-79.460))::numeric(8,4) -- Richmond Hill
        ELSE (random() * (-79.650 - (-79.730)) + (-79.730))::numeric(8,4) -- Oakville
    END,
    -- Generate neighborhood names
    CASE
        WHEN i % 10 = 0 THEN
            CASE
                WHEN (random() * 5)::integer = 0 THEN 'King West Area'
                WHEN (random() * 5)::integer = 1 THEN 'Queen West Area'
                WHEN (random() * 5)::integer = 2 THEN 'Bay Street Corridor'
                WHEN (random() * 5)::integer = 3 THEN 'Waterfront Area'
                ELSE 'Old Toronto Area'
            END
        WHEN i % 10 = 1 THEN
            CASE
                WHEN (random() * 5)::integer = 0 THEN 'Yonge-Eglinton Area'
                WHEN (random() * 5)::integer = 1 THEN 'Mount Pleasant Area'
                WHEN (random() * 5)::integer = 2 THEN 'Chaplin Estates'
                WHEN (random() * 5)::integer = 3 THEN 'Deer Park'
                ELSE 'Midtown Area'
            END
        WHEN i % 10 = 2 THEN
            CASE
                WHEN (random() * 5)::integer = 0 THEN 'High Park North'
                WHEN (random() * 5)::integer = 1 THEN 'Junction Triangle'
                WHEN (random() * 5)::integer = 2 THEN 'Swansea Area'
                WHEN (random() * 5)::integer = 3 THEN 'Parkdale Area'
                ELSE 'West Toronto Area'
            END
        WHEN i % 10 = 3 THEN
            CASE
                WHEN (random() * 5)::integer = 0 THEN 'Upper Beaches'
                WHEN (random() * 5)::integer = 1 THEN 'Danforth Village'
                WHEN (random() * 5)::integer = 2 THEN 'Greenwood-Coxwell'
                WHEN (random() * 5)::integer = 3 THEN 'Woodbine Corridor'
                ELSE 'East Toronto Area'
            END
        WHEN i % 10 = 4 THEN
            CASE
                WHEN (random() * 5)::integer = 0 THEN 'Mississauga City Centre Area'
                WHEN (random() * 5)::integer = 1 THEN 'Hurontario Area'
                WHEN (random() * 5)::integer = 2 THEN 'Clarkson Area'
                WHEN (random() * 5)::integer = 3 THEN 'Lorne Park Area'
                ELSE 'Central Mississauga Area'
            END
        WHEN i % 10 = 5 THEN
            CASE
                WHEN (random() * 5)::integer = 0 THEN 'Downtown Brampton Area'
                WHEN (random() * 5)::integer = 1 THEN 'Fletchers Creek'
                WHEN (random() * 5)::integer = 2 THEN 'Heart Lake Area'
                WHEN (random() * 5)::integer = 3 THEN 'Northgate Area'
                ELSE 'Central Brampton Area'
            END
        WHEN i % 10 = 6 THEN
            CASE
                WHEN (random() * 5)::integer = 0 THEN 'VMC Area'
                WHEN (random() * 5)::integer = 1 THEN 'Concord Area'
                WHEN (random() * 5)::integer = 2 THEN 'Vellore Village'
                WHEN (random() * 5)::integer = 3 THEN 'Patterson Area'
                ELSE 'Vaughan Area'
            END
        WHEN i % 10 = 7 THEN
            CASE
                WHEN (random() * 5)::integer = 0 THEN 'Downtown Markham Area'
                WHEN (random() * 5)::integer = 1 THEN 'Greensborough Area'
                WHEN (random() * 5)::integer = 2 THEN 'Cathedraltown'
                WHEN (random() * 5)::integer = 3 THEN 'Wismer Commons'
                ELSE 'Central Markham Area'
            END
        WHEN i % 10 = 8 THEN
            CASE
                WHEN (random() * 5)::integer = 0 THEN 'Downtown Richmond Hill'
                WHEN (random() * 5)::integer = 1 THEN 'Jefferson Area'
                WHEN (random() * 5)::integer = 2 THEN 'Elgin Mills Area'
                WHEN (random() * 5)::integer = 3 THEN 'Harding Area'
                ELSE 'Central Richmond Hill Area'
            END
        ELSE
            CASE
                WHEN (random() * 5)::integer = 0 THEN 'Downtown Oakville Area'
                WHEN (random() * 5)::integer = 1 THEN 'Iroquois Ridge'
                WHEN (random() * 5)::integer = 2 THEN 'West Oak Trails'
                WHEN (random() * 5)::integer = 3 THEN 'River Oaks Area'
                ELSE 'Central Oakville Area'
            END
    END,
    -- Generate scores and metrics based on area
    CASE
        WHEN i % 10 = 0 THEN (random() * 2 + 7)::integer -- Toronto Core overall
        WHEN i % 10 = 1 THEN (random() * 2 + 7)::integer -- Toronto Midtown overall
        WHEN i % 10 = 2 THEN (random() * 2 + 7)::integer -- Toronto West overall
        WHEN i % 10 = 3 THEN (random() * 2 + 7)::integer -- Toronto East overall
        WHEN i % 10 = 4 THEN (random() * 2 + 6)::integer -- Mississauga overall
        WHEN i % 10 = 5 THEN (random() * 2 + 6)::integer -- Brampton overall
        WHEN i % 10 = 6 THEN (random() * 2 + 6)::integer -- Vaughan overall
        WHEN i % 10 = 7 THEN (random() * 2 + 6)::integer -- Markham overall
        WHEN i % 10 = 8 THEN (random() * 2 + 6)::integer -- Richmond Hill overall
        ELSE (random() * 2 + 6)::integer -- Oakville overall
    END,
    CASE
        WHEN i % 10 = 0 THEN (random() * 2 + 7)::integer -- Toronto Core performance
        WHEN i % 10 = 1 THEN (random() * 2 + 6)::integer -- Toronto Midtown performance
        WHEN i % 10 = 2 THEN (random() * 2 + 6)::integer -- Toronto West performance
        WHEN i % 10 = 3 THEN (random() * 2 + 6)::integer -- Toronto East performance
        WHEN i % 10 = 4 THEN (random() * 2 + 6)::integer -- Mississauga performance
        WHEN i % 10 = 5 THEN (random() * 2 + 7)::integer -- Brampton performance
        WHEN i % 10 = 6 THEN (random() * 2 + 6)::integer -- Vaughan performance
        WHEN i % 10 = 7 THEN (random() * 2 + 6)::integer -- Markham performance
        WHEN i % 10 = 8 THEN (random() * 2 + 6)::integer -- Richmond Hill performance
        ELSE (random() * 2 + 6)::integer -- Oakville performance
    END,
    CASE
        WHEN i % 10 = 0 THEN (random() * 2 + 7)::integer -- Toronto Core risk
        WHEN i % 10 = 1 THEN (random() * 2 + 7)::integer -- Toronto Midtown risk
        WHEN i % 10 = 2 THEN (random() * 2 + 6)::integer -- Toronto West risk
        WHEN i % 10 = 3 THEN (random() * 2 + 6)::integer -- Toronto East risk
        WHEN i % 10 = 4 THEN (random() * 2 + 6)::integer -- Mississauga risk
        WHEN i % 10 = 5 THEN (random() * 2 + 5)::integer -- Brampton risk
        WHEN i % 10 = 6 THEN (random() * 2 + 6)::integer -- Vaughan risk
        WHEN i % 10 = 7 THEN (random() * 2 + 6)::integer -- Markham risk
        WHEN i % 10 = 8 THEN (random() * 2 + 7)::integer -- Richmond Hill risk
        ELSE (random() * 2 + 7)::integer -- Oakville risk
    END,
    CASE
        WHEN i % 10 = 0 THEN (random() * 2 + 8)::integer -- Toronto Core demand
        WHEN i % 10 = 1 THEN (random() * 2 + 7)::integer -- Toronto Midtown demand
        WHEN i % 10 = 2 THEN (random() * 2 + 7)::integer -- Toronto West demand
        WHEN i % 10 = 3 THEN (random() * 2 + 7)::integer -- Toronto East demand
        WHEN i % 10 = 4 THEN (random() * 2 + 6)::integer -- Mississauga demand
        WHEN i % 10 = 5 THEN (random() * 2 + 6)::integer -- Brampton demand
        WHEN i % 10 = 6 THEN (random() * 2 + 6)::integer -- Vaughan demand
        WHEN i % 10 = 7 THEN (random() * 2 + 6)::integer -- Markham demand
        WHEN i % 10 = 8 THEN (random() * 2 + 6)::integer -- Richmond Hill demand
        ELSE (random() * 2 + 6)::integer -- Oakville demand
    END,
    CASE
        WHEN i % 10 = 0 THEN (random() * 2 + 5)::integer -- Toronto Core supply
        WHEN i % 10 = 1 THEN (random() * 2 + 5)::integer -- Toronto Midtown supply
        WHEN i % 10 = 2 THEN (random() * 2 + 6)::integer -- Toronto West supply
        WHEN i % 10 = 3 THEN (random() * 2 + 6)::integer -- Toronto East supply
        WHEN i % 10 = 4 THEN (random() * 2 + 6)::integer -- Mississauga supply
        WHEN i % 10 = 5 THEN (random() * 2 + 7)::integer -- Brampton supply
        WHEN i % 10 = 6 THEN (random() * 2 + 6)::integer -- Vaughan supply
        WHEN i % 10 = 7 THEN (random() * 2 + 6)::integer -- Markham supply
        WHEN i % 10 = 8 THEN (random() * 2 + 5)::integer -- Richmond Hill supply
        ELSE (random() * 2 + 5)::integer -- Oakville supply
    END,
    CASE
        WHEN i % 10 = 0 THEN (random() * 0.8 + 2.5)::numeric(8,2) -- Toronto Core cap rate
        WHEN i % 10 = 1 THEN (random() * 0.8 + 2.7)::numeric(8,2) -- Toronto Midtown cap rate
        WHEN i % 10 = 2 THEN (random() * 0.8 + 2.9)::numeric(8,2) -- Toronto West cap rate
        WHEN i % 10 = 3 THEN (random() * 0.8 + 3.0)::numeric(8,2) -- Toronto East cap rate
        WHEN i % 10 = 4 THEN (random() * 1.0 + 3.1)::numeric(8,2) -- Mississauga cap rate
        WHEN i % 10 = 5 THEN (random() * 1.0 + 3.5)::numeric(8,2) -- Brampton cap rate
        WHEN i % 10 = 6 THEN (random() * 1.0 + 3.2)::numeric(8,2) -- Vaughan cap rate
        WHEN i % 10 = 7 THEN (random() * 1.0 + 3.2)::numeric(8,2) -- Markham cap rate
        WHEN i % 10 = 8 THEN (random() * 1.0 + 3.0)::numeric(8,2) -- Richmond Hill cap rate
        ELSE (random() * 1.0 + 2.8)::numeric(8,2) -- Oakville cap rate
	END,
	NOW(), NOW()
FROM generate_series(1, 370) as i;