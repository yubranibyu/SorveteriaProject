


export default function SideNav() {
  return (
    <nav className="h-full w-full bg-gray-800 text-white">
        <ul className="space-y-4 p-4">
            <li>
                <a href="/dashboard" className="block rounded-md px-3 py-2 hover:bg-gray-700">
                    Dashboard
                </a>
            </li>
            <li>
                <a href="/dashboard/products" className="block rounded-md px-3 py-2 hover:bg-gray-700">
                    Products
                </a>
            </li>   

            <li>
                <a href="/dashboard/orders" className="block rounded-md px-3 py-2 hover:bg-gray-700">
                    Orders
                </a>
            </li>
        </ul>
    </nav>
);

}