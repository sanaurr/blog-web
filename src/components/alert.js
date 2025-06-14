
'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AlertDialog({ errorMessage }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false); // Hide the alert after 5 seconds
        }, 5000);
        return () => clearTimeout(timer); // Clear timeout when component unmounts
    }, []);

    // Animation variants for framer motion
    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -50 },
    };

    return visible ? (
        <motion.div
            className="flex justify-center bg-red-500 text-white px-4 py-3 rounded-md shadow-lg"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 1.0 }}
        >
            <p>{errorMessage}</p>
        </motion.div>
    ) : null;
}
