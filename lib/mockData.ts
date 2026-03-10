export interface PropertyBase {
    id: string;
    images: string[];
    slug: string;
    lat: number;
    lng: number;
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    area: string;
}

export interface FeaturedProperty extends PropertyBase {
    tag: string;
}

export interface StandardProperty extends PropertyBase {
    status: "FOR SALE" | "FOR RENT";
    priceSuffix?: string;
    hiddenClasses?: string;
}

export const featuredProperties: FeaturedProperty[] = [
    {
        id: "f1",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCra-FKp81t0_OM8bWD55m2o9OOSnR_v7D0UilyExMImxyIcr9tIMZ2Py3HcC0ra_MtSsBkduMcwxUNKI9_iSXFFr_YRON1SF9hNM3fcYy-uG7N7uusL0Z367WINi1V7_GwfNQx-gsbUqLtzVi4ivFyqFQGb4qBs79bALeSFb6i3_ZnJnI1VVrN-VeZYHjfYyQI5C6zy90N3uxWZpwzIBhNoUDKKQjQ8EOEYPoyPTzhnh6b6AS3dkkFJ8t4xSDC6qjhMrQUoUPnAeM",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        tag: "Exclusive",
        title: "The Glass Pavilion",
        location: "Beverly Hills, California",
        price: "$5,250,000",
        beds: 5,
        baths: 4.5,
        area: "4,200",
    },
    {
        id: "f2",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDurAGHzg_fpQxFal-obkFVy1Q3WLPdueAQpz0itcQiRV-WfvulnBEDJbNeV8J06q4mX7PTtXYVJjX4-mHVr_khZLZxQ_s8f6fruGqzeqALyMu8wEHRK1EsOs9f4_jPmS7FxcdzrDkR88Wz0GjaPLXkTZRoJQfur59rxYRLi-WYcW-VU_gKS39CPLOMlftvqGvW0IOk5tXgst5mJ4WQM-ICN4vkdel9ido9YFUQga0OI10i6NSe5W4owt33-2YRi_b_ltdZW2QZC5s",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        tag: "New Arrival",
        title: "Azure Heights Penthouse",
        location: "Downtown, Vancouver",
        price: "$3,800,000",
        beds: 3,
        baths: 3,
        area: "2,100",
    },
];

export const standardProperties: StandardProperty[] = [
    {
        id: "s1",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDuQ9M7U6euA6_cXmYuXnej-N5IuawAW8ds-4G1mzfqmiBc13qXsPhf9_j_zTB8gfEunrBHo8xMsxYwCw_pl8fsxbxRkmyvLR1N9Tiye5ZJG7fwlLn9MwyBanXYhE0emGwp59es1FEyQTRQbmXLUKO74Yj34ZHqrqIkOtMKhP8CmRFvfoHT5LAe10105vUhKNkxIBvtt530nfLigSUTemOOcJMVNmsgactntRJUwOBU_TZzND7BYtDklr8uZcNYlQOK5U74-ufIf-E",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR SALE",
        price: "$850,000",
        title: "Modern Family Home",
        location: "123 Pine St, Seattle",
        beds: 3,
        baths: 2,
        area: "120",
    },
    {
        id: "s2",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB4zNatD3vePhIZAi6OHHJKmamYSgeBNSKjEt32tvkkf4s6aBXCF8R4LNfDfPa9leA0t6N1OKOcP358WwZrnosbCBxSM7EaY2_P7qkx3MinRgmHQn7RvleNTwy8cLigMoR3iv0u83chBVbZYI6BcNMcqv80W-l1pIUgIWZcDIXEqtUatrsojSGfM0lTNDZpkBntBUkRY6NB4ZUymYNYvTHXKbO8NZ6N6uoyuuHqcaRWKzHCNXkOR3p-_EVFAHR8QwijIY_m1mefPZ4",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR RENT",
        price: "$3,200",
        priceSuffix: "/mo",
        title: "Urban Loft",
        location: "456 Elm Ave, Portland",
        beds: 1,
        baths: 1,
        area: "85",
    },
    {
        id: "s3",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuARQWC19e7mleUpjb8CWLztEv_svJeRFOaC2i-9r9GctFuX5Barzhfai9wNM1WW8bcGlqdFM32d3KPf7SItom5ijdHOz5rGGQPeT7PlWs8-y9LkfcsHLQqsLxalhxP94XJo76_mAMp7T2dVj3hPKHNzTDLLiS6ujSdSsyo3onxQthp4ZkVE8op92gyTLUUucaGaxO8vJvyhH3HuWB07EPqT1WsW0lr9Of5lUPonjG9eiqE1XiJXTqzXUZQt5JorfPwCO1MioZA_Zro",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR SALE",
        price: "$620,000",
        title: "Highland Retreat",
        location: "789 Mountain Rd, Bend",
        beds: 2,
        baths: 2,
        area: "98",
    },
    {
        id: "s4",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBGq4Phm0uDzCnjHAsnWpYTBVpOds_M6iOsJuRQQA5eUZHkztGgtc7eh_OE6wBeyW1-iZh7yyhROnvvmqkAZ9tyAWFGXk0FG52zU4kZ_EDLA0U0cRszy7byNXTeWe0_hS53SYmtCTEV8Y1AM-WxiIC38UMa15QwFDjXtCGQOxoh35K0Ol_70vfsxm0VqDbaWkr8tcEbLTLy0NXH_GcpGK4lAXizgxYOIlFWGyau-4OIfPZRpjCBDbz_qu3VlN201UUJGiuM9ajVd-U",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR RENT",
        price: "$4,500",
        priceSuffix: "/mo",
        title: "Sea View Penthouse",
        location: "321 Ocean Dr, Miami",
        beds: 3,
        baths: 3,
        area: "180",
    },
    {
        id: "s5",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA1w-Hb1289NqZKon3VK8bpmMiCDYYiAMT5egzTINo9m9wSZRHv-k-1IGTVoL1NT8YeZXJHa87JPNDIPrtrbP7jChHq0ypXF90uByhC6VA9O788_B4FY8JVg4chbWN9bcrn9-9FvVvfZX8Aj60Iqg_C8CsCA9DEnJqi2rJvzmK5UP5z-9XRTRjBneAPCa8iGgGWBD9yYKsziN6vn0ePBDGo3inieQtmbr46W31p6UfQ649XRxTm7ygOY2J-jxW1r0qWs8i97KGpkTE",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR SALE",
        price: "$550,000",
        title: "Central Studio",
        location: "555 Main St, Chicago",
        beds: 1,
        baths: 1,
        area: "50",
        hiddenClasses: "hidden xl:flex",
    },
    {
        id: "s6",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCfGXdY0g51ojSg0GMeTW9ndLY3mpKK3oMtWxo2nwd_dwi1pgn1Boi_ovaDGIFhUA7nwu3WdBch8ZuHxoHu3QfgM5ceAsp8pglRVyCROWNcy9zeDNP2wqLoevyKGcaEyFYHYpIx2KK46nLWthnHiHugmkKw48kJsL8IjMO1bL3T1Zwt8bvQDTTUHTgB3GqZ2RU2asRzF1jVg0rLw3LWXXTq0YF1CsbhlWpYOuCEpH5bB8zkBlbKXR4At_M46AL8rJqn5c6BrPD5PP8",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR RENT",
        price: "$2,800",
        priceSuffix: "/mo",
        title: "Garden Villa",
        location: "999 Oak Ln, Austin",
        beds: 2,
        baths: 2,
        area: "110",
        hiddenClasses: "hidden lg:flex",
    },
    {
        id: "s7",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR SALE",
        price: "$1,200,000",
        title: "Classic Brick House",
        location: "101 Maple St, Atlanta",
        beds: 4,
        baths: 3,
        area: "250",
    },
    {
        id: "s8",
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR RENT",
        price: "$3,500",
        priceSuffix: "/mo",
        title: "Minimalist Townhouse",
        location: "202 Birch Blvd, Denver",
        beds: 2,
        baths: 2.5,
        area: "140",
    },
    {
        id: "s9",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR SALE",
        price: "$2,100,000",
        title: "Sunny Beach House",
        location: "303 Ocean Ave, San Diego",
        beds: 5,
        baths: 4,
        area: "320",
    },
    {
        id: "s10",
        images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR RENT",
        price: "$4,200",
        priceSuffix: "/mo",
        title: "Downtown Condo",
        location: "404 Broadway, New York",
        beds: 1,
        baths: 1,
        area: "75",
    },
    {
        id: "s11",
        images: [
            "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR SALE",
        price: "$450,000",
        title: "Cozy Cottage",
        location: "505 Pine Ln, Asheville",
        beds: 2,
        baths: 1,
        area: "90",
    },
    {
        id: "s12",
        images: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR SALE",
        price: "$3,500,000",
        title: "Luxury Mansion",
        location: "606 Prestige Way, Dallas",
        beds: 6,
        baths: 6.5,
        area: "650",
    },
    {
        id: "s13",
        images: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR RENT",
        price: "$2,900",
        priceSuffix: "/mo",
        title: "Lakefront Cabin",
        location: "707 Waters Edge, Lake Tahoe",
        beds: 3,
        baths: 2,
        area: "160",
    },
    {
        id: "s14",
        images: [
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR SALE",
        price: "$780,000",
        title: "Desert Oasis",
        location: "808 Cactus Rd, Phoenix",
        beds: 4,
        baths: 2.5,
        area: "210",
    },
    {
        id: "s15",
        images: [
            "https://images.unsplash.com/photo-1600585154526-990dced4ea0d?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR RENT",
        price: "$5,500",
        priceSuffix: "/mo",
        title: "Smart Home",
        location: "909 Tech Blvd, San Francisco",
        beds: 3,
        baths: 3,
        area: "190",
    },
    {
        id: "s16",
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1de2d93688?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        slug: "mock-slug",
        lat: 34.0522,
        lng: -118.2437,
        status: "FOR SALE",
        price: "$600,000",
        title: "Suburban Retreat",
        location: "1010 Family Ct, Orlando",
        beds: 4,
        baths: 2,
        area: "185",
    },
];
