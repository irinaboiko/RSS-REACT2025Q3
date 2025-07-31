import { useNavigate } from 'react-router';

import { ROUTES } from '@/constants/routes';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 dark:text-stone-300">
      <div className="flex items-center gap-1">
        <span className="text-9xl">4</span>
        <svg
          className="h-28"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            fill="currentColor"
            stroke="none"
          >
            <path
              d="M3480 5053 c-8 -3 -450 -191 -981 -419 -531 -227 -1019 -433 -1085
        -457 -149 -55 -233 -93 -343 -156 -93 -54 -134 -90 -150 -134 -15 -39 -13
        -107 3 -137 13 -24 9 -30 -167 -206 -177 -180 -180 -181 -206 -168 -59 31
        -154 11 -202 -42 -55 -62 -165 -278 -223 -439 -227 -634 -140 -1338 234 -1895
        350 -521 894 -854 1520 -930 108 -13 359 -13 475 0 312 36 665 158 890 309 78
        52 109 131 81 212 l-16 44 178 178 c122 122 182 175 192 171 73 -31 146 -23
        199 21 50 43 153 233 221 410 l28 70 189 -4 c175 -3 192 -2 228 17 23 11 147
        128 286 269 223 225 248 253 268 306 11 32 21 78 21 102 0 102 -71 209 -169
        257 -34 17 -64 22 -116 22 -106 0 -143 -22 -296 -171 -73 -70 -130 -121 -127
        -113 3 8 138 321 298 695 315 732 317 736 277 810 -9 17 -65 79 -126 140
        l-111 110 -884 -884 -883 -883 -12 -84 c-50 -355 -274 -616 -618 -721 -78 -23
        -105 -26 -228 -26 -155 0 -246 18 -362 73 -248 116 -432 352 -483 620 -18 93
        -14 258 9 355 58 244 225 456 448 569 83 41 201 76 283 82 l75 6 887 887 888
        886 -112 112 c-62 62 -127 120 -144 128 -31 15 -104 19 -134 8z"
            />
            <path
              d="M2971 3396 l-453 -453 73 -48 c94 -61 183 -151 246 -247 l50 -76 452
        452 c248 248 451 456 451 461 -1 27 -293 324 -351 355 -12 7 -115 -91 -468
        -444z"
            />
            <path
              d="M2060 2670 c-196 -24 -358 -165 -416 -361 -22 -74 -20 -199 5 -280
        93 -298 442 -436 716 -282 185 103 285 323 242 529 -55 258 -288 426 -547 394z"
            />
          </g>
        </svg>
        <span className="text-9xl">4</span>
      </div>
      <p className="text-2xl">
        Looks like this page made the jump to hyperspace.
      </p>
      <button onClick={handleGoHome} className="btn btn-gray">
        Go Home
      </button>
    </div>
  );
};
