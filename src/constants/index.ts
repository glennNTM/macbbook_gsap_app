export interface NavLink {
    label: string;
    href: string;
}

export interface PerformanceImage {
    id: string;
    src: string;
    width: number;
    height: number;
}

export interface PerformanceImgPosition {
    id: string;
    left?: number;
    right?: number;
    bottom?: number;
    transform?: string;
}

export interface Feature {
    id: number;
    icon: string;
    highlight: string;
    text: string;
    styles: string;
    /** Vidéo affichée sur l'écran du MacBook pendant cette étape. */
    video: string;
}

export interface FooterLink {
    label: string;
    link: string;
}

export type MacbookSize = "14" | "16";

export interface MacbookColor {
    value: string;
    label: string;
    swatch: string;
}

export interface MacbookSizeOption {
    value: MacbookSize;
    label: string;
    scale: number;
    mobileScale: number;
}

const MACBOOK_COLORS: MacbookColor[] = [
    { value: "#adb5db", label: "Silver", swatch: "bg-neutral-300" },
    { value: "#2e2c2e", label: "Space Black", swatch: "bg-neutral-900" },
];

const DEFAULT_COLOR = "#2e2c2e";

const MACBOOK_SIZES: MacbookSizeOption[] = [
    { value: "14", label: '14"', scale: 0.06, mobileScale: 0.03 },
    { value: "16", label: '16"', scale: 0.08, mobileScale: 0.05 },
];

// Liens factices : les pages cibles n'existent pas dans ce projet.
const navLinks: NavLink[] = [
    { label: "Store", href: "#" },
    { label: "Mac", href: "#" },
    { label: "iPhone", href: "#" },
    { label: "Watch", href: "#" },
    { label: "Vision", href: "#" },
    { label: "AirPods", href: "#" },
];

const noChangeParts: string[] = [
    "Object_84",
    "Object_37",
    "Object_34",
    "Object_12",
    "Object_80",
    "Object_35",
    "Object_36",
    "Object_13",
    "Object_125",
    "Object_76",
    "Object_33",
    "Object_42",
    "Object_58",
    "Object_52",
    "Object_21",
    "Object_10",
];

const performanceImages: PerformanceImage[] = [
    { id: "p1", src: "/performance1.png", width: 454, height: 305 },
    { id: "p2", src: "/performance2.png", width: 712, height: 464 },
    { id: "p3", src: "/performance3.png", width: 904, height: 586 },
    { id: "p4", src: "/performance4.png", width: 1008, height: 652 },
    { id: "p5", src: "/performance5.jpg", width: 1408, height: 864 },
    { id: "p6", src: "/performance6.png", width: 356, height: 244 },
    { id: "p7", src: "/performance7.png", width: 1064, height: 684 },
];

const performanceImgPositions: PerformanceImgPosition[] = [
    {
        id: "p1",
        left: 5,
        bottom: 65,
    },
    {
        id: "p2",
        right: 10,
        bottom: 60,
    },
    {
        id: "p3",
        right: -5,
        bottom: 45,
    },
    {
        id: "p4",
        right: -10,
        bottom: 0,
    },
    {
        id: "p5",
        left: 20,
        bottom: 50,
    },
    {
        id: "p6",
        left: 2,
        bottom: 30,
    },
    {
        id: "p7",
        left: -5,
        bottom: 0,
    },
];

const features: Feature[] = [
    {
        id: 1,
        icon: "/feature-icon1.svg",
        highlight: "Email AI.",
        text: "Summarize and draft replies to emails instantly, so you stay on top of your inbox.",
        styles: "left-5 md:left-20 top-[20%]",
        video: "/videos/feature-1.mp4",
    },
    {
        id: 2,
        icon: "/feature-icon2.svg",
        highlight: "Image AI.",
        text: "Generate or edit images with ease. Just type what you imagine, and let AI bring it to life.",
        styles: "right-5 md:right-20 top-[30%]",
        video: "/videos/feature-2.mp4",
    },
    {
        id: 3,
        icon: "/feature-icon3.svg",
        highlight: "Summarize AI.",
        text: "Turn long articles, reports, or notes into clear, bite-sized summaries in seconds.",
        styles: "left-5 md:left-20 top-[50%]",
        video: "/videos/feature-3.mp4",
    },
    {
        id: 4,
        icon: "/feature-icon4.svg",
        highlight: "AirDrop.",
        text: "Wirelessly share photos, large files, and more between your iPhone, your Mac, & other devices.",
        styles: "right-5 md:right-20 top-[70%]",
        video: "/videos/feature-4.mp4",
    },
    {
        id: 5,
        icon: "/feature-icon5.svg",
        highlight: "Writing Tool.",
        text: "Write smarter and faster, whether it’s blogs, essays, or captions, AI helps polish your words.",
        styles: "left-5 md:left-20 top-[90%]",
        video: "/videos/feature-5.mp4",
    },
];

const footerLinks: FooterLink[] = [
    { label: "Privacy Policy", link: "#" },
    { label: "Terms of Use", link: "#" },
    { label: "Sales Policy", link: "#" },
    { label: "Legal", link: "#" },
    { label: "Site Map", link: "#" },
];

export {
    DEFAULT_COLOR,
    MACBOOK_COLORS,
    MACBOOK_SIZES,
    features,
    footerLinks,
    navLinks,
    noChangeParts,
    performanceImages,
    performanceImgPositions,
};
