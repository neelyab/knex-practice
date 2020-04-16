DROP TYPE IF EXISTS grocery;
CREATE TYPE grocery as ENUM(
    'main',
    'snack',
    'lunch',
    'breakfast'

);

CREATE TABLE IF NOT EXISTS shopping_list(
    item_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    item_name TEXT NOT NULL,
    item_price DECIMAL(12,2) NOT NULL,
    date_added TIMESTAMP DEFAULT now() NOT NULL,
    checked BOOLEAN DEFAULT FALSE NOT NULL,
    category grocery NOT NULL

);