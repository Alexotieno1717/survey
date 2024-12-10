import axios from 'axios';
import {NextResponse} from "next/server";

export default async function handler() {
    try {
        const url = `http://165.22.46.7:3003/api/faqs`;
        const response = await axios.get(url);

        console.log("Fetched data:", response.data);

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error("Error fetching FAQs:", error);

        return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
    }
}