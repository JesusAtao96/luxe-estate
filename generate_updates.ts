import fs from "fs";

const ids = ["s2", "s3", "s7", "c10b8f95-3238-4a07-a6a8-131c5dce7bf0", "s8", "s5", "s6", "s10", "s11", "s12", "s13", "s14", "s15", "s16", "f1", "f2", "s9", "s1", "s4", "c602affd-e5f3-405a-8c59-b637d55e8193", "e45d1b1f-6d08-4eea-9a1b-e1b8351aad8e", "0534928a-bdc0-4f1e-948a-fe1a2dda78c2", "9be9076a-88dc-4fcd-956b-90ac4c087c5a", "7c093a43-e463-4057-84ad-51c7da50dcc5", "52df633c-8067-4958-8e9a-0b1914a4cbc5", "1db167c5-daaf-4426-8a95-4b407e8a68ea", "49ac198a-28a5-45df-bc83-43fc38257ad2", "cdef72d4-057c-4ebb-b219-429df578270c", "b7adbc48-991a-468f-9c45-3b9cd3c36871", "d3f3564b-2eec-4e9c-b915-a446d8f06af5", "2945de36-b093-4108-98ed-d8ebb6facd82", "f5f8259b-cf39-4974-aefa-3e5d62bc84ce", "133805b2-42a0-4dad-ae87-0c04fbbea553", "18dcda0f-ab48-4c6a-8291-f5f0c694f35b", "3e022ca8-bc8d-48b8-a439-dc85d27e22d3", "7763e84f-3202-4947-863e-723ee7bca218", "c57d0a07-6865-423b-94e5-0fdcfe50d668", "c579e7e5-95a6-4a7d-8a43-e91ee38fa16e"];

const imagePool = [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1628015081036-0747ec8f077a",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
    "https://images.unsplash.com/photo-1416331108676-a22ccb276e35"
];

const statements = ids.map(id => {
    const shuffled = [...imagePool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3).map(url => `${url}?w=800&q=80`);
    return `UPDATE properties SET images = ARRAY['${selected[0]}', '${selected[1]}', '${selected[2]}'] WHERE id = '${id}';`;
});

fs.writeFileSync("update_images2.sql", statements.join("\n"));
console.log("Done");
