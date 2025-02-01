import Link from 'next/link';

import ProductItem from '@/components/products/ProductItem';
import { Rating } from '@/components/products/Rating';
import productServices from '@/lib/services/productService';

const sortOrders = ['newest', 'lowest', 'highest', 'rating'];
const prices = [
  {
    name: 'از 0 تا 500 هزار تومان',
    value: '0-5000000',
  },
  {
    name: 'از 500 هزار تومان تا 1 میلیون تومان',
    value: '5000001-10000000',
  },
  {
    name: 'از 1 میلیون تومان تا 5 میلیون تومان',
    value: '10000001-50000000',
  },
];

const ratings = [5, 4, 3, 2, 1];

export async function generateMetadata({
  searchParams: { q = 'all', category = 'all', price = 'all', rating = 'all' },
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  if (
    (q !== 'all' && q !== '') ||
    category !== 'all' ||
    rating !== 'all' ||
    price !== 'all'
  ) {
    return {
      title: `Search ${q !== 'all' ? q : ''}
          ${category !== 'all' ? ` : Category ${category}` : ''}
          ${price !== 'all' ? ` : Price ${price}` : ''}
          ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
    };
  } else {
    return {
      title: 'Search Products',
    };
  }
}

export default async function SearchPage({
  searchParams: {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  },
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/search?${new URLSearchParams(params).toString()}`;
  };
  const categories = await productServices.getCategories();
  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    q,
    price,
    rating,
    page,
    sort,
  });
  return (
    <div className='grid md:grid-cols-12 md:gap-5 py-8'>
      <div className='md:col-span-3 space-y-4'>
        <div className='bg-base-300 p-4 rounded-2xl text-lg font-bold mb-4 flex items-center justify-between'>
          فیلترها
          {(q !== 'all' && q !== '') ||
            category !== 'all' ||
            rating !== 'all' ||
            price !== 'all' ? (
            <Link className='btn btn-ghost btn-sm' href='/search'>حذف</Link>
          ) : null}
        </div>
        <div className='bg-base-300 p-4 rounded-2xl'>
          <div className='mb-4 font-bold '>دسته بندی</div>
          <ul>
            {categories.map((c: string) => (
              <li key={c}>
                <Link
                  className={`${c === category && 'link-primary'
                    }`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='bg-base-300 p-4 rounded-2xl'>
          <div className='mb-4 font-bold '>قیمت</div>
          <ul>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`${p.value === price && 'link-primary'
                    }`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='bg-base-300 p-4 rounded-2xl'>
          <div className='mb-4 font-bold'>امتیاز محصول</div>
          <ul className='flex flex-col gap-1'>

            {ratings.map((r) => (
              <li  key={r}>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`${`${r}` === rating && 'link-primary'
                    }`}
                >
                  <Rating caption='' value={r} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='md:col-span-9'>
        <div className='flex items-center justify-between mb-4 md:flex-row'>
          <div>
            مرتب سازی :
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mx-2 ${sort == s ? 'link-primary' : ''
                  } `}
                href={getFilterUrl({ s })}
              >
                {s == 'newest' ? ' جدید ترین ' : s == 'lowest' ? ' ارزان ترین ' : s == 'highest' ? ' گران ترین ' : s == 'rating' ? ' پیشنهاد خریداران ' : ''}
              </Link>
            ))}
          </div>

          <p>{countProducts} کالا</p>

        </div>

        <div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3  '>
            {products.map((product) => (
              <ProductItem key={product.slug} product={product} />
            ))}
          </div>
          {products.length == 0 &&
              (
                <div className='flex items-center justify-center py-20'>
                  <p className='text-muted-foreground'>محصولی برای نمایش وجود ندارد.</p>
                </div>
              )}
          <div className='join'>
            {products.length > 0 &&
              Array.from(Array(pages).keys()).map((p) => (
                <Link
                  key={p}
                  className={`btn join-item ${Number(page) === p + 1 ? 'btn-active' : ''
                    } `}
                  href={getFilterUrl({ pg: `${p + 1}` })}
                >
                  {p + 1}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
