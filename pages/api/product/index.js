import { data } from "@/utils/centricData";

export default function handler (req, res) {
    res.status(200).json(data.products)
}