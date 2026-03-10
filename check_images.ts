const imagePool = [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1628015081036-0747ec8f077a",
    "https://images.unsplash.com/photo-1600607687931-570a2f4cc8cc",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2cb62",
    "https://images.unsplash.com/photo-1564013799912-8d774880c10a",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83",
    "https://images.unsplash.com/photo-1570129477492-45c0051de666",
    "https://images.unsplash.com/photo-1605146769062-817ab56f6104",
    "https://images.unsplash.com/photo-1568605114961-d706509e5122",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
    "https://images.unsplash.com/photo-1416331108676-a22ccb276e35"
];

async function checkImages() {
    for (const img of imagePool) {
        try {
            const res = await fetch(img + "?w=800&q=80", { method: 'HEAD' });
            if (!res.ok) {
                console.log(`BROKEN: ${img}`);
            } else {
                console.log(`OK: ${img}`);
            }
        } catch (err) {
            console.log(`ERROR: ${img}`);
        }
    }
}

checkImages();
