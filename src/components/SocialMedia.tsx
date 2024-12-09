const sizeIcons = "size-12";
const classStyles = "hover:scale-125 transition-all duration-150";

const SocialMedia = () => {
  const classList = `${sizeIcons} ${classStyles}`;
  return (
    <span className="flex gap-2">
      <a href="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={classList}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
        </svg>
      </a>
      <a href="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={classList}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
          <path d="M16.5 7.5v.01"></path>
        </svg>
      </a>
      <a href="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={classList}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M8 11v5"></path>
          <path d="M8 8v.01"></path>
          <path d="M12 16v-5"></path>
          <path d="M16 16v-3a2 2 0 1 0 -4 0"></path>
          <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"></path>
        </svg>
      </a>
      <a href="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={classList}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z"></path>
          <path d="M10 9l5 3l-5 3z"></path>
        </svg>
      </a>
      <a href="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={classList}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z"></path>
        </svg>
      </a>
    </span>
  );
};

export default SocialMedia;
