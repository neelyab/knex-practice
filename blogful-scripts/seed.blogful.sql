INSERT INTO blogful_articles(title, date_published, content)
VALUES
('how to make soap', now()-'2 days'::INTERVAL, 'this is how to make soap. You"ll need some glycerin, essential oils....'),
('banana bread recipe', now() - '20 days'::INTERVAL, 'ingredients: bananas, sugar, milk, flour, vanilla, cinnamon, baking powder'),
('mending a shirt', now() - '22 days'::INTERVAL, 'You can mend a shirt very easily using these simple steps. You"ll need some thread, a sewing needle, a shirt, some scissors, and you"ll need to know a simple sewing stitch.'),
('lentil soup recipe', now() - '30 days'::INTERVAL, 'ingredients: lentils, veggie broth, onion, carrots, celery, thyme, bay leaves');