let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('websiteProjectDB');

db.serialize(function () {
    // Create tables
    db.run(`
        CREATE TABLE IF NOT EXISTS CustomerQueries (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            fname TEXT, 
            lname TEXT, 
            mobile TEXT,
            email TEXT,
            address TEXT,
            city TEXT,
            state TEXT,
            postcode TEXT,
            querytype TEXT,
            querydetail TEXT
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT,
            email TEXT UNIQUE, 
            password TEXT
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Products (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            type TEXT,
            name TEXT,
            src TEXT, 
            price DECIMAL,
            desc TEXT
        )
    `);
    // Insert values
    db.run(`
        INSERT INTO Users(name, email, password) VALUES 
        ("John", "john@deakin.edu.au", "111111"),
        ("Alice", "alice@deakin.edu.au", "222222")`
    );
    db.run(`
        INSERT INTO Products(type, name, src, price, desc) VALUES 
        ("painting", "Matisse Structure - 75ml", "images/categories/painting/product1.png", 7.98, "Painting supply for your magnificient art. Can be used for variety of artworks"),
        ("painting", "Atelier Interactive Fine Artists' Heavy Body Acrylic Paints 80ml", "images/categories/painting/product2.png", 7.98, "Painting supply for your magnificient art. Can be used for variety of artworks"),
        ("painting", "Jo Sonja's Fine Artists' Matte Flow Acrylic Paints 75m", "images/categories/painting/product3.png", 6.49, "Painting supply for your magnificient art. Can be used for variety of artworks"),
        ("painting", "Jacquard Pinata Alcohol Ink - 1/2 fl oz / 14.79ml", "images/categories/painting/product4.png", 6.48, "Painting supply for your magnificient art. Can be used for variety of artworks"),
        ("painting", "Matisse Structure - 250ml", "images/categories/painting/product5.png", 16.25, "Painting supply for your magnificient art. Can be used for variety of artworks"),
        ("painting", "Winsor & Newton Winton Oil Colour 200ml", "images/categories/painting/product6.png", 36.89, "Painting supply for your magnificient art. Can be used for variety of artworks"),
        ("drawing", "Faber-Castell Graphite Pencil Castell 9000 - Single", "images/categories/drawing/product1.png", 2.28, "Drawing supply for your magnificient art. Can be used for variety of artworks"),
        ("drawing", "Prismacolor Premier Coloured Pencil Individual", "images/categories/drawing/product2.png", 2.28, "Drawing supply for your magnificient art. Can be used for variety of artworks"),
        ("drawing", "Staedtler Lumocolor Permanent Glasochrom Replaces Chinagraph", "images/categories/drawing/product3.png", 2.26, "Drawing supply for your magnificient art. Can be used for variety of artworks"),
        ("drawing", "Faber-Castell Pitt Natural Charcoal Pencil", "images/categories/drawing/product4.png", 3.53, "Drawing supply for your magnificient art. Can be used for variety of artworks"),
        ("drawing", "Uni Pin Fineliner Drawing Pen Individual and Set", "images/categories/drawing/product5.png", 18.93, "Drawing supply for your magnificient art. Can be used for variety of artworks"),
        ("drawing", "Uni POSCA Water-based Pigment Ink Marker - Ultra Fine(0.7mm) Bullet Tip(PC-1MR)", "images/categories/drawing/product6.png", 34.20, "Drawing supply for your magnificient art. Can be used for variety of artworks"),
        ("crafting", "STAEDTLER FIMO Soft & Effect Modelling Clay Pack", "images/categories/crafting/product1.png", 31.45, "Crafting supply for your magnificient art. Can be used for variety of artworks"),
        ("crafting", "STAEDTLER Noris Junior Modelling Dough Set", "images/categories/crafting/product2.png", 14.50, "Crafting supply for your magnificient art. Can be used for variety of artworks"),
        ("crafting", "Pebeo Create Your Own Candle Kit", "images/categories/crafting/product3.png", 103.50, "Crafting supply for your magnificient art. Can be used for variety of artworks"),
        ("crafting", "Candlewick", "images/categories/crafting/product4.png", 3.5, "Crafting supply for your magnificient art. Can be used for variety of artworks"),
        ("crafting", "D&L Candlewax 1kg", "images/categories/crafting/product5.png", 23.95, "Crafting supply for your magnificient art. Can be used for variety of artworks"),
        ("crafting", "STAEDTLER FIMO Soft Modelling Clay Value Pack", "images/categories/crafting/product6.png", 32.50, "Crafting supply for your magnificient art. Can be used for variety of artworks"),
        ("paper", "Canson CA Grain 224 Sheet Light Grain Paper A2 100 Pack", "images/categories/paper/product1.png", 190, "Paper supply for your magnificient art. Can be used for variety of artworks"),
        ("paper", "Canson CA Grain Drawing Paper Pads 224gsm", "images/categories/paper/product2.png", 11.35, "Paper supply for your magnificient art. Can be used for variety of artworks"),
        ("paper", "Canson Iris Vivaldi Colour Paper Sheets 280gsm 50x65cm Pack 25", "images/categories/paper/product3.png", 137.5, "Paper supply for your magnificient art. Can be used for variety of artworks"),
        ("paper", "Canson JA Dessin 1557 Drawing Paper Pads 120gsm 50 sheets", "images/categories/paper/product4.png", 11.88, "Paper supply for your magnificient art. Can be used for variety of artworks"),
        ("paper", "Canson Mi-Teintes Paper Pads 160gsm 20 Sheets", "images/categories/paper/product5.png", 17.54, "Paper supply for your magnificient art. Can be used for variety of artworks"),
        ("paper", "Canson Mi-Teintes Pastel Drawing Paper Sheets 160gsm 50 x 65 cm Pack of 10", "images/categories/paper/product6.png", 45.05, "Paper supply for your magnificient art. Can be used for variety of artworks"),
        ("other", "Luca Pottery Clay Modelling and Sculpting Tools Kit", "images/categories/others/product1.png", 12.12, "Other supply for your magnificient art. Can be used for variety of artworks"),
        ("other", "Mont Marte Pottery Tool Kit 10pc", "images/categories/others/product2.png", 17.80, "Other supply for your magnificient art. Can be used for variety of artworks"),
        ("other", "Scotch Removable Tape, Boxed", "images/categories/others/product3.png", 16.09, "Other supply for your magnificient art. Can be used for variety of artworks"),
        ("other", "Semi-cured Rubber Adhesive Masking Tape", "images/categories/others/product4.png", 2.3, "Other supply for your magnificient art. Can be used for variety of artworks"),
        ("other", "Mont Marte Adhesive - Washable Clear School Glue", "images/categories/others/product5.png", 4.08, "Other supply for your magnificient art. Can be used for variety of artworks"),
        ("other", "Royal & Langnickel Honeycomb Sea Silk Sponge", "images/categories/others/product6.png", 6.88, "Other supply for your magnificient art. Can be used for variety of artworks") `
    );
    // Display all inserted data
    console.log('=== [Table:Users] Display inserted rows ===');
    db.each("SELECT * FROM Users", function (err, row) {
        console.log("[all] Name: " + row.name + "  Email: " + row.email + "  Password: " + row.password);
    });
    console.log('=== [Table:Products] Display inserted rows ===');
    db.each("SELECT * FROM Products", function (err, row) {
        console.log("[all] Type: " + row.type + "  Name: " + row.name);
    });
});
db.close();