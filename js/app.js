// Re-Life Platform - JavaScript
const products = [
    {
        id: 1,
        title: "Meja Kayu Jati Bekas",
        description: "Meja kayu jati solid, masih kokoh dan layak pakai. Cocok untuk ruang makan atau kerja.",
        category: "kayu",
        location: "bandung",
        owner: "Pak Budi",
        icon: "bi-tree",
        co2Saved: 12,
        energySaved: 45,
        waterSaved: 230
    },
    {
        id: 2,
        title: "Botol Plastik HDPE",
        description: "Kumpulan botol plastik HDPE bersih, siap didaur ulang menjadi biji plastik.",
        category: "plastik",
        location: "jakarta",
        owner: "Komunitas Hijau",
        icon: "bi-cup",
        co2Saved: 3.5,
        energySaved: 18,
        waterSaved: 95
    },
    {
        id: 3,
        title: "Laptop Rusak untuk Sparepart",
        description: "Laptop masih bisa diambil komponen elektroniknya: RAM, HDD, Motherboard untuk sparepart.",
        category: "elektronik",
        location: "yogyakarta",
        owner: "Tech Reuse",
        icon: "bi-cpu",
        co2Saved: 25,
        energySaved: 120,
        waterSaved: 580
    },
    {
        id: 4,
        title: "Pipa Besi Bekas",
        description: "Pipa besi galvanis berbagai ukuran, cocok untuk konstruksi atau kerajinan.",
        category: "logam",
        location: "surabaya",
        owner: "Toko Bangunan",
        icon: "bi-gear",
        co2Saved: 8.2,
        energySaved: 62,
        waterSaved: 340
    },
    {
        id: 5,
        title: "Kain Perca Tekstil",
        description: "Kumpulan kain perca bersih dari konveksi, bisa digunakan untuk kerajinan atau daur ulang tekstil.",
        category: "tekstil",
        location: "bandung",
        owner: "Butik Vintage",
        icon: "bi-bag",
        co2Saved: 4.8,
        energySaved: 28,
        waterSaved: 450
    },
    {
        id: 6,
        title: "Kursi Kayu Bekas",
        description: "Kursi kayu solid dengan finishing masih bagus. Bisa direstorasi atau digunakan langsung.",
        category: "kayu",
        location: "jakarta",
        owner: "Ibu Sari",
        icon: "bi-chair",
        co2Saved: 9.5,
        energySaved: 38,
        waterSaved: 185
    },
    {
        id: 7,
        title: "Ember Plastik Bekas",
        description: "Ember plastik ukuran besar, masih kuat dan layak pakai untuk berbagai keperluan.",
        category: "plastik",
        location: "surabaya",
        owner: "Warung Pak Joko",
        icon: "bi-bucket",
        co2Saved: 2.1,
        energySaved: 12,
        waterSaved: 65
    },
    {
        id: 8,
        title: "Kabel Tembaga Bekas",
        description: "Kabel tembaga bekas dari instalasi listrik, siap didaur ulang untuk ekstraksi logam murni.",
        category: "logam",
        location: "yogyakarta",
        owner: "Elektrik Mandiri",
        icon: "bi-plug",
        co2Saved: 15.3,
        energySaved: 95,
        waterSaved: 420
    }
];

let cartCount = 0;
let currentProduct = null;

// Hero stats animation
function animateHeroStats() {
    const co2El = document.getElementById('heroCo2');
    const itemsEl = document.getElementById('heroItems');
    const usersEl = document.getElementById('heroUsers');
    
    const co2Target = 2458;
    const itemsTarget = 1247;
    const usersTarget = 892;
    
    let co2 = 0, items = 0, users = 0;
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    const timer = setInterval(() => {
        co2 += co2Target / steps;
        items += itemsTarget / steps;
        users += usersTarget / steps;
        
        if (co2 >= co2Target) {
            co2El.textContent = co2Target.toLocaleString('id-ID');
            itemsEl.textContent = itemsTarget.toLocaleString('id-ID');
            usersEl.textContent = usersTarget.toLocaleString('id-ID');
            clearInterval(timer);
        } else {
            co2El.textContent = Math.floor(co2).toLocaleString('id-ID');
            itemsEl.textContent = Math.floor(items).toLocaleString('id-ID');
            usersEl.textContent = Math.floor(users).toLocaleString('id-ID');
        }
    }, interval);
}

// Render products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const countEl = document.getElementById('productsCount');
    const categoryFilter = document.querySelector('input[name="category"]:checked').value;
    const locationFilter = document.getElementById('locationFilter').value;
    const sortFilter = document.getElementById('sortSelect').value;
    
    let filtered = products.filter(p => {
        const categoryMatch = categoryFilter === 'all' || p.category === categoryFilter;
        const locationMatch = locationFilter === 'all' || p.location === locationFilter;
        return categoryMatch && locationMatch;
    });
    
    if (sortFilter === 'co2-high') {
        filtered.sort((a, b) => b.co2Saved - a.co2Saved);
    } else if (sortFilter === 'co2-low') {
        filtered.sort((a, b) => a.co2Saved - b.co2Saved);
    }
    
    countEl.textContent = `Menampilkan ${filtered.length} barang`;
    
    grid.innerHTML = '';
    
    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <i class="bi ${product.icon}"></i>
                <div class="eco-badge">
                    <i class="bi bi-leaf"></i>
                    ${product.co2Saved} kg CO₂
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-meta">
                    <span class="product-category">
                        <i class="bi bi-tag"></i>
                        ${getCategoryName(product.category)}
                    </span>
                    <span class="product-location">
                        <i class="bi bi-geo-alt"></i>
                        ${getLocationName(product.location)}
                    </span>
                </div>
                <div class="product-owner">
                    <i class="bi bi-person-circle"></i>
                    ${product.owner}
                </div>
            </div>
        `;
        card.addEventListener('click', () => openProductModal(product));
        grid.appendChild(card);
    });
}

function getCategoryName(cat) {
    const map = {
        plastik: 'Plastik',
        kayu: 'Kayu',
        elektronik: 'Elektronik',
        logam: 'Logam',
        tekstil: 'Tekstil'
    };
    return map[cat] || cat;
}

function getLocationName(loc) {
    const map = {
        jakarta: 'Jakarta',
        bandung: 'Bandung',
        surabaya: 'Surabaya',
        yogyakarta: 'Yogyakarta'
    };
    return map[loc] || loc;
}

// Modal functions
function openProductModal(product) {
    currentProduct = product;
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalIcon').className = `bi ${product.icon}`;
    document.getElementById('modalDesc').textContent = product.description;
    document.getElementById('modalCategory').textContent = getCategoryName(product.category);
    document.getElementById('modalLocation').textContent = getLocationName(product.location);
    document.getElementById('modalOwner').textContent = product.owner;
    document.getElementById('modalCo2').textContent = product.co2Saved + ' kg';
    document.getElementById('modalEnergy').textContent = product.energySaved + ' kWh';
    document.getElementById('modalWater').textContent = product.waterSaved + ' L';
    
    document.getElementById('productModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openCheckoutModal() {
    closeProductModal();
    document.getElementById('checkoutItemName').textContent = currentProduct.title;
    document.getElementById('checkoutItemCo2').textContent = currentProduct.co2Saved + ' kg';
    document.getElementById('checkoutModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('checkoutName').value = '';
    document.getElementById('checkoutPhone').value = '';
    document.getElementById('checkoutMessage').value = '';
}

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Calculator
function updateCalculator() {
    const plastic = parseFloat(document.getElementById('plasticSlider').value);
    const wood = parseFloat(document.getElementById('woodSlider').value);
    const metal = parseFloat(document.getElementById('metalSlider').value);
    const electronic = parseFloat(document.getElementById('electronicSlider').value);
    
    document.getElementById('plasticValue').textContent = plastic;
    document.getElementById('woodValue').textContent = wood;
    document.getElementById('metalValue').textContent = metal;
    document.getElementById('electronicValue').textContent = electronic;
    
    // Emission factors (kg CO2 per kg)
    const co2Plastic = plastic * 2.5;
    const co2Wood = wood * 1.2;
    const co2Metal = metal * 4.8;
    const co2Electronic = electronic * 20;
    
    const totalCo2 = co2Plastic + co2Wood + co2Metal + co2Electronic;
    
    // Energy saved (kWh per kg)
    const energyPlastic = plastic * 8;
    const energyWood = wood * 3;
    const energyMetal = metal * 12;
    const energyElectronic = electronic * 50;
    
    const totalEnergy = energyPlastic + energyWood + energyMetal + energyElectronic;
    
    // Trees equivalent (1 tree absorbs ~22kg CO2/year)
    const trees = totalCo2 / 22;
    
    document.getElementById('co2Result').textContent = totalCo2.toFixed(1) + ' kg';
    document.getElementById('energyResult').textContent = totalEnergy.toFixed(0) + ' kWh';
    document.getElementById('treeResult').textContent = trees.toFixed(2) + ' pohon';
}

// Smooth scroll and nav
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom > 100) {
                current = section.getAttribute('id');
            }
        });
        
        if (current) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + current);
            });
        }
    });
}

// Parallax effect
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.eco-circle');
        const hero = document.querySelector('.hero');
        
        parallaxElements.forEach(el => {
            const speed = 0.6;
            el.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        if (hero) {
            const speed = 0.3;
            hero.style.backgroundPositionY = `${scrolled * speed}px`;
        }
    });
}

// Mouse parallax effect
function setupMouseParallax() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const ecoCircle = document.querySelector('.eco-circle');
        if (ecoCircle) {
            ecoCircle.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    animateHeroStats();
    renderProducts();
    setupNavigation();
    setupParallax();
    setupMouseParallax();
    updateCalculator();
    
    // Filter events
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', renderProducts);
    });
    
    document.getElementById('locationFilter').addEventListener('change', renderProducts);
    document.getElementById('sortSelect').addEventListener('change', renderProducts);
    
    // Calculator sliders
    document.getElementById('plasticSlider').addEventListener('input', updateCalculator);
    document.getElementById('woodSlider').addEventListener('input', updateCalculator);
    document.getElementById('metalSlider').addEventListener('input', updateCalculator);
    document.getElementById('electronicSlider').addEventListener('input', updateCalculator);
    
    // Product modal
    document.getElementById('modalClose').addEventListener('click', closeProductModal);
    document.getElementById('modalCancel').addEventListener('click', closeProductModal);
    
    document.getElementById('modalCheckout').addEventListener('click', openCheckoutModal);
    
    document.getElementById('productModal').addEventListener('click', (e) => {
        if (e.target.id === 'productModal') {
            closeProductModal();
        }
    });
    
    // Checkout modal
    document.getElementById('checkoutClose').addEventListener('click', closeCheckoutModal);
    document.getElementById('checkoutBack').addEventListener('click', () => {
        closeCheckoutModal();
        openProductModal(currentProduct);
    });
    
    document.getElementById('checkoutSubmit').addEventListener('click', () => {
        const name = document.getElementById('checkoutName').value.trim();
        const phone = document.getElementById('checkoutPhone').value.trim();
        
        if (!name) {
            alert('Mohon isi nama lengkap!');
            return;
        }
        if (!phone) {
            alert('Mohon isi nomor telepon!');
            return;
        }
        
        cartCount++;
        document.getElementById('cartCount').textContent = cartCount;
        
        closeCheckoutModal();
        showToast('Permintaan tukar berhasil dikirim!');
    });
    
    document.getElementById('checkoutModal').addEventListener('click', (e) => {
        if (e.target.id === 'checkoutModal') {
            closeCheckoutModal();
        }
    });
    
    // Cart button
    document.getElementById('cartBtn').addEventListener('click', () => {
        if (cartCount > 0) {
            showToast(`Anda memiliki ${cartCount} permintaan tukar aktif`);
        } else {
            showToast('Keranjang kosong. Mulai tukar barang di marketplace!');
        }
    });
});
