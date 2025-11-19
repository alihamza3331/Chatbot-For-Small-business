<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FastFoodFeel Pakistan</title>
    <!-- Load Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
        }
        /* Custom scrollbar for better aesthetics */
        .custom-scroll::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
            background-color: #fcd34d; /* yellow-400 */
            border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
            background-color: #fef3c7; /* yellow-100 */
        }
    </style>
</head>
<body>

    <div id="app" class="min-h-screen">
        <!-- Content will be injected here by JavaScript -->
    </div>

    <!-- JavaScript Logic -->
    <script type="text/javascript">
        // --- State Management (Vanilla JS equivalent of React state) ---
        let state = {
            currentPage: 'home',
            isMenuOpen: false,
            cart: [],
            showCart: false,
        };

        function setState(newState, skipRender = false) {
            state = { ...state, ...newState };
            if (!skipRender) {
                renderApp();
            }
        }

        // --- Data Definitions ---
        const featuredItems = [
            { name: 'Zinger Burger', price: 600, img: '🍔', desc: 'Crispy Zinger Fillet with Signature Mayo', calories: 450 },
            { name: 'Mighty Zinger', price: 770, img: '🍔', desc: 'Double Zinger Fillet with Cheese', calories: 680 },
            { name: 'Hot Wings (10 pcs)', price: 670, img: '🍗', desc: 'Spicy and Fiery Hot Wings', calories: 550 },
            { name: 'Zingeratha', price: 390, img: '🌯', desc: 'Zinger Strips in Traditional Paratha', calories: 410 }
        ];

        const menuCategories = [
            {
                category: 'Burgers & Wraps',
                items: [
                    { name: 'Zinger Burger', price: 600, calories: 450, desc: 'Crispy Zinger Fillet, Signature Mayo, Lettuce, Sesame Bun' },
                    { name: 'Krunch Burger', price: 310, calories: 320, desc: 'Crispy Chicken Fillet, Signature Sauce, Lettuce, Soft Bun' },
                    { name: 'Mighty Zinger', price: 770, calories: 680, desc: 'Double Zinger Fillet, Spicy & Plain Mayo, Cheese, Sesame Bun' },
                    { name: 'Zingeratha', price: 390, calories: 410, desc: 'Zinger Strips, Imli Chutney, Mint Mayo, Paratha Wrap' },
                    { name: 'Tower Burger', price: 890, calories: 750, desc: 'Zinger Fillet, Hash Brown, Cheese Slice, Signature Sauce' },
                    { name: 'BBQ Ranch Wrap', price: 450, calories: 380, desc: 'Grilled Chicken Strips, BBQ Sauce, Ranch Dressing' }
                ]
            },
            {
                category: 'Fried Chicken',
                items: [
                    { name: 'Hot & Crispy Chicken (1 pc)', price: 320, calories: 280, desc: 'Hot & Crispy Fried Chicken, Original Recipe Seasoning' },
                    { name: 'Hot Wings (10 pcs)', price: 670, calories: 550, desc: 'Spicy and Fiery Hot Chicken Wings' }
                ]
            },
            {
                category: 'Pizza',
                items: [
                    { name: 'Chicken Tikka Pizza (M)', price: 1200, calories: 850, desc: 'Chicken Tikka Chunks, Onions, Green Chili, Mozzarella' },
                    { name: 'Fajita Pizza (L)', price: 1550, calories: 1000, desc: 'Chicken Fajita Strips, Capsicum, Olives, Special Sauce' },
                    { name: 'Pepperoni Delight Pizza (M)', price: 1350, calories: 900, desc: 'Beef Pepperoni Slices, Extra Mozzarella, Oregano' }
                ]
            },
            {
                category: 'Snacks & Sides',
                items: [
                    { name: 'Hot Shots (9 pcs)', price: 480, calories: 350, desc: 'Bite-sized, spicy chicken pieces' },
                    { name: 'Rice & Spice', price: 390, calories: 520, desc: 'Spicy Rice, Chicken Pieces, Vietnamese Sauce' },
                    { name: 'French Fries (Regular)', price: 340, calories: 300, desc: 'Golden Fried Potatoes' },
                    { name: 'Loaded Cheesy Bites (12 pcs)', price: 550, calories: 480, desc: 'Fried Cheese and Herb Bites with Dipping Sauce' }
                ]
            },
            {
                category: 'Combos & Deals',
                items: [
                    { name: 'Krunch Combo', price: 590, calories: 800, desc: 'Krunch Burger, Regular Fries, Regular Drink' },
                    { name: 'Wow Box', price: 1050, calories: 1150, desc: 'Zinger Burger, 1pc Chicken, Regular Fries, Coleslaw, Regular Drink' }
                ]
            }
        ];

        const locationsData = [
            { city: 'Lahore', address: '1-D, Gulberg II, Main Boulevard, Lahore', phone: '+92-42-XXXXXXX', hours: '11:00 AM - 2:00 AM' },
            { city: 'Karachi', address: 'Plot 1, Block 3, Clifton Road, Near Teen Talwar, Karachi', phone: '+92-21-XXXXXXX', hours: '11:00 AM - 2:00 AM' },
            { city: 'Islamabad', address: 'F-7 Markaz, Next to Jinnah Super Market, Islamabad', phone: '+92-51-XXXXXXX', hours: '11:00 AM - 2:00 AM' }
        ];

        // --- Utility Functions ---

        function Icon(name, classes = "w-6 h-6") {
            const icons = {
                Menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`,
                X: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
                ShoppingCart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 12.08a2 2 0 0 0 2 1.92h9.72a2 2 0 0 0 2-1.92L23 6H6"></path></svg>`,
                MapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M12 19.5l-7-7a5 5 0 0 1 10 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
                Phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.88-6.88A19.79 19.79 0 0 1 1.05 4.18 2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 2.18 15.22 15.22 0 0 0 2 5.56 2 2 0 0 1-.58 2.15l-1.39 1.39a17 17 0 0 0 7 7l1.39-1.39a2 2 0 0 1 2.15-.58 15.22 15.22 0 0 0 5.56 2 2 2 0 0 1 2.18 2v3"></path></svg>`,
                Mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
                Star: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
                ChevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
                Clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
                Heart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M19 14c1.49-1.46 3-3.23 3-5.55A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.35.88-4.5 2.22-1.15-1.34-2.74-2.22-4.5-2.22A5.5 5.5 0 0 0 2 8.45c0 2.32 1.51 4.09 3 5.55l7 7 7-7z"></path></svg>`
            };
            return icons[name] || '';
        }

        function getTotalPrice() {
            return state.cart.reduce((total, item) => total + item.price, 0);
        }

        function navigateTo(page) {
            setState({ currentPage: page, isMenuOpen: false });
        }

        function addToCart(item) {
            setState({ cart: [...state.cart, item] }, true); // Don't re-render entire app, only the cart
            renderCart();
        }

        function removeFromCart(index) {
            const newCart = state.cart.filter((_, i) => i !== index);
            setState({ cart: newCart }, true); // Don't re-render entire app, only the cart
            renderCart();
        }

        // --- View Rendering Functions (Return HTML strings) ---

        function renderNavigation() {
            const navItems = [
                { name: 'Home', page: 'home' },
                { name: 'Menu', page: 'menu' },
                { name: 'Locations', page: 'locations' },
                { name: 'About', page: 'about' }
            ];

            const navLinks = navItems.map(item => `
                <button
                    onclick="navigateTo('${item.page}')"
                    class="font-medium transition-colors duration-200 ${
                        state.currentPage === item.page ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-white hover:text-yellow-300'
                    }"
                >
                    ${item.name}
                </button>
            `).join('');

            const mobileLinks = navItems.map(item => `
                <button
                    onclick="navigateTo('${item.page}')"
                    class="block w-full text-left px-3 py-2 text-white hover:bg-red-800 rounded-md"
                >
                    ${item.name}
                </button>
            `).join('');

            return `
                <nav class="fixed w-full z-50 bg-red-600 shadow-lg">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between items-center h-20">
                            <div class="flex items-center cursor-pointer" onclick="navigateTo('home')">
                                <h1 class="text-3xl font-bold text-white tracking-tight">FastFoodFeel</h1>
                                <span class="ml-2 text-white text-sm opacity-90">.pk</span>
                            </div>
                            <div class="hidden md:flex space-x-8">
                                ${navLinks}
                            </div>
                            <div class="flex items-center space-x-4">
                                <button
                                    id="cart-btn"
                                    class="relative text-white hover:text-yellow-300 transition-colors"
                                >
                                    ${Icon('ShoppingCart', 'w-6 h-6')}
                                    ${state.cart.length > 0 ? `
                                        <span id="cart-count" class="absolute -top-2 -right-2 bg-yellow-400 text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                            ${state.cart.length}
                                        </span>
                                    ` : '<span id="cart-count"></span>'}
                                </button>
                                <button id="menu-toggle-btn" class="md:hidden text-white">
                                    ${state.isMenuOpen ? Icon('X', 'w-6 h-6') : Icon('Menu', 'w-6 h-6')}
                                </button>
                            </div>
                        </div>
                    </div>
                    ${state.isMenuOpen ? `
                        <div class="md:hidden bg-red-700">
                            <div class="px-2 pt-2 pb-3 space-y-1">
                                ${mobileLinks}
                            </div>
                        </div>
                    ` : ''}
                </nav>
            `;
        }

        function renderHomePage() {
            const featuredHtml = featuredItems.map((item, index) => `
                <div
                    class="bg-gray-50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-red-500"
                >
                    <div class="text-6xl mb-4 text-center">${item.img}</div>
                    <h3 class="text-xl font-bold mb-2 text-gray-800">${item.name}</h3>
                    <p class="text-gray-600 text-sm mb-3">${item.desc}</p>
                    <p class="text-xs text-gray-500 mb-3">${item.calories} kcal</p>
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-red-600">Rs. ${item.price}</span>
                        <button
                            data-item-index="${index}"
                            class="add-to-cart-home bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors font-medium"
                        >
                            Add
                        </button>
                    </div>
                </div>
            `).join('');

            return `
                <div class="pt-20">
                    <!-- Hero Section -->
                    <section class="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                            <div class="grid md:grid-cols-2 gap-12 items-center">
                                <div class="space-y-6">
                                    <h2 class="text-5xl md:text-6xl font-bold leading-tight">
                                        Taste the <span class="text-yellow-300">Perfection</span>
                                    </h2>
                                    <p class="text-xl text-red-100">
                                        100% Halal. Fresh & Crispy. Made with Love in Pakistan.
                                    </p>
                                    <div class="flex flex-wrap gap-4">
                                        <button
                                            onclick="navigateTo('menu')"
                                            class="bg-yellow-400 text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-xl"
                                        >
                                            Order Now
                                        </button>
                                        <button
                                            onclick="navigateTo('menu')"
                                            class="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl"
                                        >
                                            View Menu
                                        </button>
                                    </div>
                                    <div class="flex items-center space-x-6 pt-4">
                                        <div class="flex items-center">
                                            ${Icon('Star', 'text-yellow-300 fill-yellow-300 w-5 h-5')}
                                            <span class="ml-2 text-lg font-semibold">4.5/5 Rating</span>
                                        </div>
                                        <div class="text-lg font-semibold">133+ Locations</div>
                                    </div>
                                </div>
                                <div class="relative flex justify-center">
                                    <div class="text-9xl animate-bounce">🍔</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Featured Items -->
                    <section class="py-16 bg-white">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                                Fan <span class="text-red-600">Favorites</span>
                            </h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                ${featuredHtml}
                            </div>
                        </div>
                    </section>

                    <!-- Deals Section -->
                    <section class="py-16 bg-gradient-to-r from-yellow-400 to-yellow-500">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 class="text-4xl font-bold text-center mb-12 text-red-600">Exclusive Deals</h2>
                            <div class="grid md:grid-cols-3 gap-8">
                                <div class="bg-white rounded-2xl p-8 shadow-xl text-center transform hover:scale-105 transition-transform">
                                    <div class="text-5xl mb-4">🌙</div>
                                    <h3 class="text-2xl font-bold mb-3 text-gray-800">Midnight Deal</h3>
                                    <p class="text-gray-600 mb-4">Special discounted combos after 12 AM</p>
                                    <button class="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700">
                                        Learn More
                                    </button>
                                </div>
                                <div class="bg-white rounded-2xl p-8 shadow-xl text-center transform hover:scale-105 transition-transform">
                                    <div class="text-5xl mb-4">📱</div>
                                    <h3 class="text-2xl font-bold mb-3 text-gray-800">App Exclusive</h3>
                                    <p class="text-gray-600 mb-4">Get special deals on our mobile app</p>
                                    <button class="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700">
                                        Download App
                                    </button>
                                </div>
                                <div class="bg-white rounded-2xl p-8 shadow-xl text-center transform hover:scale-105 transition-transform">
                                    <div class="text-5xl mb-4">👨‍👩‍👧‍👦</div>
                                    <h3 class="text-2xl font-bold mb-3 text-gray-800">Family Festival</h3>
                                    <p class="text-gray-600 mb-4">Sharing boxes for the whole family</p>
                                    <button class="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700">
                                        View Deals
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            `;
        }

        function renderMenuPage() {
            const menuHtml = menuCategories.map((category, idx) => {
                const itemsHtml = category.items.map((item, itemIdx) => `
                    <div
                        class="bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1"
                    >
                        <div class="flex justify-between items-start mb-3">
                            <h3 class="text-xl font-bold text-gray-800 flex-1">${item.name}</h3>
                            <span class="text-2xl font-bold text-red-600 ml-2">Rs. ${item.price}</span>
                        </div>
                        <p class="text-sm text-gray-600 mb-3">${item.desc}</p>
                        <p class="text-xs text-gray-500 mb-4">${item.calories} kcal</p>
                        <button
                            data-cat-index="${idx}"
                            data-item-index="${itemIdx}"
                            class="add-to-cart-menu w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-bold"
                        >
                            Add to Cart
                        </button>
                    </div>
                `).join('');

                return `
                    <div class="mb-16">
                        <h2 class="text-4xl font-bold mb-8 text-red-600 border-b-4 border-red-600 inline-block pb-2">
                            ${category.category}
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            ${itemsHtml}
                        </div>
                    </div>
                `;
            }).join('');

            return `
                <div class="pt-20 min-h-screen bg-gray-50">
                    <div class="bg-red-600 text-white py-12">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h1 class="text-5xl font-bold mb-4">Our Menu</h1>
                            <p class="text-xl text-red-100">100% Halal Chicken • Fresh Ingredients • Made with Love</p>
                        </div>
                    </div>
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        ${menuHtml}
                    </div>
                </div>
            `;
        }

        function renderLocationsPage() {
            const locationsHtml = locationsData.map(location => `
                <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
                    ${Icon('MapPin', 'text-red-600 mb-4 w-10 h-10')}
                    <h2 class="text-3xl font-bold mb-4 text-gray-800">${location.city}</h2>
                    <div class="space-y-3 text-gray-600">
                        <p class="flex items-start">
                            ${Icon('MapPin', 'w-4 h-4 mr-2 mt-1 flex-shrink-0')}
                            <span>${location.address}</span>
                        </p>
                        <p class="flex items-center">
                            ${Icon('Phone', 'w-4 h-4 mr-2')}
                            <span>${location.phone}</span>
                        </p>
                        <p class="flex items-center">
                            ${Icon('Clock', 'w-4 h-4 mr-2')}
                            <span>${location.hours}</span>
                        </p>
                    </div>
                    <button class="mt-6 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-bold flex items-center justify-center">
                        Get Directions ${Icon('ChevronRight', 'w-4 h-4 ml-2')}
                    </button>
                </div>
            `).join('');

            return `
                <div class="pt-20 min-h-screen bg-gray-50">
                    <div class="bg-red-600 text-white py-12">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h1 class="text-5xl font-bold mb-4">Our Locations</h1>
                            <p class="text-xl text-red-100">133+ Restaurants across 38 cities in Pakistan</p>
                        </div>
                    </div>
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div class="grid md:grid-cols-3 gap-8 mb-16">
                            ${locationsHtml}
                        </div>
                        <div class="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-12 text-white text-center">
                            <h2 class="text-3xl font-bold mb-4">Find Your Nearest FastFoodFeel</h2>
                            <p class="text-xl mb-6 text-red-100">Use our store locator or order through Foodpanda</p>
                            <div class="flex flex-wrap justify-center gap-4">
                                <button class="bg-yellow-400 text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors">
                                    Store Locator
                                </button>
                                <button class="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
                                    Order on Foodpanda
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderAboutPage() {
            return `
                <div class="pt-20 min-h-screen bg-gray-50">
                    <div class="bg-red-600 text-white py-12">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h1 class="text-5xl font-bold mb-4">About Us</h1>
                            <p class="text-xl text-red-100">Made with Love in Pakistan</p>
                        </div>
                    </div>
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
                            <div>
                                <h2 class="text-4xl font-bold mb-6 text-gray-800">
                                    Our <span class="text-red-600">Story</span>
                                </h2>
                                <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                                    FastFoodFeel Pakistan is committed to serving 100% Halal, quality chicken using local ingredients from trusted suppliers. We operate 133+ restaurants across 38 cities, bringing delicious food to families nationwide.
                                </p>
                                <p class="text-lg text-gray-600 leading-relaxed">
                                    Every piece of chicken, every burger, and every meal is prepared with care, following the highest standards of quality and taste. We pride ourselves on being Pakistan's favorite fast food destination.
                                </p>
                            </div>
                            <div class="text-center">
                                <div class="text-9xl mb-6">❤️</div>
                                <h3 class="text-2xl font-bold text-gray-800 mb-4">Quality • Halal • Local</h3>
                            </div>
                        </div>

                        <div class="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-12 mb-16">
                            <h2 class="text-4xl font-bold mb-8 text-red-600 text-center">Mitao Bhook Initiative</h2>
                            <div class="grid md:grid-cols-3 gap-8">
                                <div class="bg-white rounded-xl p-6 text-center">
                                    <div class="text-5xl mb-4">📚</div>
                                    <h3 class="text-xl font-bold mb-3 text-gray-800">Education</h3>
                                    <p class="text-gray-600">Supporting educational programs for underprivileged communities</p>
                                </div>
                                <div class="bg-white rounded-xl p-6 text-center">
                                    <div class="text-5xl mb-4">🤝</div>
                                    <h3 class="text-xl font-bold mb-3 text-gray-800">Inclusion</h3>
                                    <p class="text-gray-600">Creating opportunities for everyone in our society</p>
                                </div>
                                <div class="bg-white rounded-xl p-6 text-center">
                                    <div class="text-5xl mb-4">🌈</div>
                                    <h3 class="text-xl font-bold mb-3 text-gray-800">Diversity</h3>
                                    <p class="text-gray-600">Celebrating and embracing our diverse workforce</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-2xl p-12 shadow-xl">
                            <div class="flex items-center justify-center mb-6">
                                ${Icon('Heart', 'text-red-600 fill-red-600 w-12 h-12')}
                            </div>
                            <h2 class="text-3xl font-bold mb-6 text-center text-red-600">Hearing With Heart</h2>
                            <p class="text-lg text-gray-600 text-center leading-relaxed max-w-3xl mx-auto">
                                We proudly operate restaurants staffed by deaf team members through our "Hearing With Heart" program. This initiative demonstrates our commitment to inclusion and provides meaningful employment opportunities for the deaf community in Pakistan.
                            </p>
                        </div>

                        <div class="mt-16 grid md:grid-cols-2 gap-8">
                            <div class="bg-red-600 text-white rounded-2xl p-8">
                                <h3 class="text-2xl font-bold mb-4">Contact Us</h3>
                                <div class="space-y-3">
                                    <p class="flex items-center">${Icon('Phone', 'w-5 h-5 mr-3')} +92-XXX-XXXXXXX</p>
                                    <p class="flex items-center">${Icon('Mail', 'w-5 h-5 mr-3')} info@fastfoodfeel.pk</p>
                                </div>
                            </div>
                            <div class="bg-yellow-400 text-red-600 rounded-2xl p-8">
                                <h3 class="text-2xl font-bold mb-4">Join Our Team</h3>
                                <p class="mb-4">Be part of Pakistan's favorite fast food family</p>
                                <button class="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors">
                                    View Careers
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderFooter() {
            return `
                <footer class="bg-gray-900 text-white py-12">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="grid md:grid-cols-4 gap-8">
                            <div>
                                <h3 class="text-2xl font-bold mb-4 text-yellow-400">FastFoodFeel</h3>
                                <p class="text-gray-400">Pakistan's favorite fast food destination</p>
                            </div>
                            <div>
                                <h4 class="font-bold mb-4">Quick Links</h4>
                                <ul class="space-y-2 text-gray-400">
                                    <li><button onclick="navigateTo('menu')" class="hover:text-yellow-400">Menu</button></li>
                                    <li><button onclick="navigateTo('locations')" class="hover:text-yellow-400">Locations</button></li>
                                    <li><button onclick="navigateTo('about')" class="hover:text-yellow-400">About Us</button></li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="font-bold mb-4">Contact</h4>
                                <div class="space-y-2 text-gray-400">
                                    <div class="flex items-center">${Icon('Phone', 'w-4 h-4 mr-2')} +92-XXX-XXXXXXX</div>
                                    <div class="flex items-center">${Icon('Mail', 'w-4 h-4 mr-2')} info@fastfoodfeel.pk</div>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-bold mb-4">Order Now</h4>
                                <p class="text-gray-400 mb-4">Via website, app, or Foodpanda</p>
                                <button class="bg-yellow-400 text-red-600 px-6 py-2 rounded-full font-bold hover:bg-yellow-300">
                                    Order Online
                                </button>
                            </div>
                        </div>
                        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 FastFoodFeel Pakistan. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            `;
        }

        function renderCart() {
            const cartElement = document.getElementById('cart-sidebar');
            const cartCountElement = document.getElementById('cart-count');

            if (!cartElement) return; // Cart sidebar not yet rendered (e.g., initial load)
            
            if (!state.showCart) {
                cartElement.innerHTML = '';
                return;
            }

            // Update cart count badge
            if (cartCountElement) {
                cartCountElement.innerHTML = state.cart.length > 0 ? state.cart.length : '';
                cartCountElement.className = state.cart.length > 0 ? "absolute -top-2 -right-2 bg-yellow-400 text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold" : '';
            }


            const cartItemsHtml = state.cart.length === 0 ? `
                <div class="text-center py-12">
                    ${Icon('ShoppingCart', 'w-16 h-16 mx-auto text-gray-300 mb-4')}
                    <p class="text-gray-500 text-lg">Your cart is empty</p>
                    <button
                        onclick="setState({ showCart: false, currentPage: 'menu' })"
                        class="mt-4 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700"
                    >
                        Browse Menu
                    </button>
                </div>
            ` : `
                <div class="space-y-4">
                    ${state.cart.map((item, index) => `
                        <div class="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                            <div class="flex-1">
                                <h3 class="font-bold text-gray-800">${item.name}</h3>
                                <p class="text-red-600 font-bold">Rs. ${item.price}</p>
                            </div>
                            <button
                                onclick="removeFromCart(${index})"
                                class="text-red-600 hover:text-red-800 font-bold"
                            >
                                ${Icon('X', 'w-5 h-5')}
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;

            const totalFooterHtml = state.cart.length > 0 ? `
                <div class="border-t p-6 bg-gray-50">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-xl font-bold text-gray-800">Total:</span>
                        <span class="text-2xl font-bold text-red-600">Rs. ${getTotalPrice()}</span>
                    </div>
                    <button class="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors">
                        Proceed to Checkout
                    </button>
                </div>
            ` : '';

            cartElement.innerHTML = `
                <div class="fixed inset-0 z-50 overflow-hidden">
                    <div class="absolute inset-0 bg-black bg-opacity-50" onclick="setState({ showCart: false })"></div>
                    <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform">
                        <div class="flex flex-col h-full">
                            <div class="bg-red-600 text-white p-6 flex justify-between items-center">
                                <h2 class="text-2xl font-bold">Your Cart</h2>
                                <button onclick="setState({ showCart: false })" class="text-white hover:text-yellow-300">
                                    ${Icon('X', 'w-7 h-7')}
                                </button>
                            </div>
                            <div class="flex-1 overflow-y-auto p-6 custom-scroll">
                                ${cartItemsHtml}
                            </div>
                            ${totalFooterHtml}
                        </div>
                    </div>
                </div>
            `;

            // Re-attach listeners for dynamically created cart buttons if needed, but since we use inline JS calls, it's fine.
        }

        function renderApp() {
            const app = document.getElementById('app');
            let content = '';

            // Render content based on current page
            switch (state.currentPage) {
                case 'home':
                    content = renderHomePage();
                    break;
                case 'menu':
                    content = renderMenuPage();
                    break;
                case 'locations':
                    content = renderLocationsPage();
                    break;
                case 'about':
                    content = renderAboutPage();
                    break;
                default:
                    content = renderHomePage();
            }

            // Combine all main parts
            app.innerHTML = `
                ${renderNavigation()}
                ${content}
                ${renderFooter()}
                <div id="cart-sidebar"></div>
            `;

            // After rendering the main structure, update the cart sidebar separately
            // and attach specific event listeners
            renderCart();
            attachEventListeners();
        }

        // --- Event Listeners and Logic ---

        function attachEventListeners() {
            // 1. Menu Toggle Button (Mobile)
            document.getElementById('menu-toggle-btn').onclick = () => {
                setState({ isMenuOpen: !state.isMenuOpen });
            };

            // 2. Cart Button (Navigation)
            document.getElementById('cart-btn').onclick = () => {
                setState({ showCart: !state.showCart });
            };

            // 3. Add to Cart (Home Page)
            document.querySelectorAll('.add-to-cart-home').forEach(button => {
                button.onclick = (e) => {
                    const index = parseInt(e.currentTarget.getAttribute('data-item-index'));
                    addToCart(featuredItems[index]);
                };
            });

            // 4. Add to Cart (Menu Page)
            document.querySelectorAll('.add-to-cart-menu').forEach(button => {
                button.onclick = (e) => {
                    const catIndex = parseInt(e.currentTarget.getAttribute('data-cat-index'));
                    const itemIndex = parseInt(e.currentTarget.getAttribute('data-item-index'));
                    addToCart(menuCategories[catIndex].items[itemIndex]);
                };
            });

            // Note: Cart removal buttons (removeFromCart) are handled by inline onclick handlers in renderCart()
        }


        // --- Chatbot Integration (YOUR CODE) ---

        function initChatbot() {
            // 1. Inject CSS Link for the Chatbot
            const link = document.createElement('link');
            link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
            link.rel = "stylesheet";
            link.id = "n8n-chat-style";

            if (!document.getElementById(link.id)) {
                document.head.appendChild(link);
            }

            // 2. Dynamically Import and Initialize the Chatbot
            import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
                .then(({ createChat }) => {
                    console.log("Initializing n8n chat widget...");
                    
                    // WARNING: This placeholder URL will cause a TypeError when running the app
                    // because 'YOUR_PRODUCTION_WEBHOOK_URL' is not a valid URL format.
                    // You MUST replace 'YOUR_PRODUCTION_WEBHOOK_URL' with your actual, valid n8n webhook endpoint for the chatbot to function correctly.
                    createChat({ 
                        webhookUrl: 'https://monnie-unharvested-joltingly.ngrok-free.dev/webhook/5c5d7ce3-6757-451c-8284-890421da4874/chat' 
                    });
                })
                .catch(error => {
                    console.error("Failed to load or initialize n8n chat module:", error);
                });
        }
        // ----------------------------------------


        // --- Initialization ---

        window.onload = function() {
            renderApp();
            initChatbot(); // Initialize the chatbot after the main app is loaded
        };

    </script>

</body>
</html>