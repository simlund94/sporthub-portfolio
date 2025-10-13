import React from "react";

const IconFactory = ({ name, className }) => {
    switch (name.toLowerCase()) {
        case "soccer":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"


                    fill="none"
                    stroke="currentColor"
                    className={className}
                >
                    <path d="M16 8C16 10.3005 15.029 12.3742 13.4744 13.8336L12.0147 11.8244L13.4959 7.26574L15.8592 6.49785C15.9516 6.98439 16 7.48655 16 8Z" fill="currentColor"/>
                    <path d="M10.3966 13L11.8573 15.0104C10.7134 15.6411 9.39861 16 8 16C6.60139 16 5.28661 15.6411 4.14273 15.0104L5.60335 13H10.3966Z" fill="currentColor"/>
                    <path d="M0 8C0 10.3005 0.971022 12.3742 2.52556 13.8336L3.98532 11.8244L2.50412 7.26575L0.140801 6.49786C0.0483698 6.9844 0 7.48655 0 8Z" fill="currentColor"/>
                    <path d="M3.12212 5.36363L0.758423 4.59561C1.90208 2.16713 4.23136 0.40714 6.99999 0.0618925V2.54619L3.12212 5.36363Z" fill="currentColor"/>
                    <path d="M8.99999 2.54619V0.0618896C11.7686 0.40713 14.0979 2.16712 15.2416 4.5956L12.8779 5.36362L8.99999 2.54619Z" fill="currentColor"/>
                    <path d="M4.47328 6.85409L7.99999 4.29179L11.5267 6.85409L10.1796 11H5.82037L4.47328 6.85409Z" fill="currentColor"/>
                </svg>
            );

        case "hockey":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className={className}
                    fill="none"
                    stroke="currentColor"
                >

                    <path d="M1.73649 0.503845L6.84737 9.44789L6.53186 10H4.85938L1.90735e-06 1.49612L1.73649 0.503845Z" fill="currentColor"/>
                    <path d="M14.9982 16H10.0138L12.2995 12H15.9982V13L14.9982 16Z" fill="currentColor"/>
                    <path d="M7.71032 16L15.9982 1.49613L14.2618 0.50385L7.69251 12H0V13L1 16L7.71032 16Z" fill="currentColor"/>
                </svg>
            );

        case "floorball":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 44.069 44.069"

                    className={className}
                    fill="none"
                    stroke="currentColor"
                >
                    <path
                        fill="currentColor"
                        d="M32.17,0L17.811,37.604c0,0-0.873,2.736-2.442,2.244c-1.312-0.643-1.366-1.301-1.771-3.539
       c-0.693-1.233-3.203-1.334-3.777,0.969c0.811,9.744,9.264,6.863,10.257,4.367c0.508-1.478,14.17-41.161,14.17-41.161L32.17,0z"
                    />
                    <path
                        fill="currentColor"
                        d="M12.642,30.641c1.562,0,2.826-1.265,2.826-2.824c0-1.563-1.265-2.825-2.826-2.825
       c-1.557-0.001-2.822,1.263-2.822,2.823C9.82,29.376,11.085,30.641,12.642,30.641z"
                    />
                </svg>

            );

        default:
            return null;
    }
};

export default IconFactory;
