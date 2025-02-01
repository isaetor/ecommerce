const Footer = () => {
  return (
    <footer className='footer footer-center bg-base-300 p-4 text-base-content'>
      <p>
      سعید ترکمان &copy; {new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date())} - کلیه حقوق برای این سایت  محفوظ است.

      </p>
    </footer>
  );
};

export default Footer;
