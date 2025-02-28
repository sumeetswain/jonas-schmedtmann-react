import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

export default function Header() {
  return (
    <div className="border-b-2 border-stone-300 bg-yellow-500 px-4 py-3 uppercase">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </div>
  );
}
