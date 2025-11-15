"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

type Props = {
    q?: string;
    price?: "all" | "free" | "paid";
    sort?: "newest" | "oldest" | "priceAsc" | "priceDesc";
    limit?: number;
};

export default function Controls({ q = "", price = "all", sort = "newest", limit = 8 }: Props) {
    const sp = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [query, setQuery] = useState(q);
    const [priceState, setPrice] = useState(price);
    const [sortState, setSort] = useState(sort);
    const [limitState, setLimit] = useState(limit);

    useEffect(() => setQuery(q), [q]);

    const update = (next: Record<string, string | number | undefined>) => {
        const params = new URLSearchParams(sp.toString());
        Object.entries(next).forEach(([k, v]) => {
            if (v === undefined || v === "" || v === "all") params.delete(k);
            else params.set(k, String(v));
        });
        params.delete("page"); // filter বদলালে page=1
        router.replace(`${pathname}?${params.toString()}`);
    };

    const debounced = useDebouncedCallback((val: string) => {
        update({ q: val });
    }, 300);

    return (
        <div className= "flex flex-col md:flex-row gap-3 md:items-center" >
        <input
        className="w-full md:w-1/2 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
    placeholder = "কোর্স খুঁজুন (title/slug)..."
    defaultValue = { query }
    onChange = {(e) => {
        setQuery(e.target.value);
        debounced(e.target.value);
    }
}
      />

    < select
className = "rounded-lg border px-3 py-2"
value = { priceState }
onChange = {(e) => { setPrice(e.target.value as any); update({ price: e.target.value }); }}
      >
    <option value="all" > সব দাম </option>
        < option value = "free" > ফ্রি </option>
            < option value = "paid" > পেইড </option>
                </select>

                < select
className = "rounded-lg border px-3 py-2"
value = { sortState }
onChange = {(e) => { setSort(e.target.value as any); update({ sort: e.target.value }); }}
      >
    <option value="newest" > নতুন আগে </option>
        < option value = "oldest" > পুরোনো আগে </option>
            < option value = "priceAsc" > দাম ⬆︎</option>
                < option value = "priceDesc" > দাম ⬇︎</option>
                    </select>

                    < select
className = "rounded-lg border px-3 py-2"
value = { limitState }
onChange = {(e) => { setLimit(Number(e.target.value)); update({ limit: Number(e.target.value) }); }}
      >
    { [6, 8, 12, 16].map(n => <option key={ n } value = { n } > প্রতি পেজ { n } </option>) }
    </select>
    </div>
  );
}
