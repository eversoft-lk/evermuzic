const script: Array<{ src: string; [key: string]: any }> = [
  {
    src: "/js/monetag/3-vignette.js",
    "data-cfasync": false,
    type: "text/javascript",
  },
  {
    src: "/js/monetag/4-vignette.js",
  },
  {
    async: true,
    "data-cfasync": false,
    src: "//thubanoa.com/1?z=7776412",
  },
];

export default function () {
  script.forEach(({ src, ...attrs }) => {
    const scriptElement = document.createElement("script");
    scriptElement.src = src;
    (Object.keys(attrs) as Array<keyof typeof attrs>).forEach((attr) => {
      scriptElement.setAttribute(attr, attrs[attr] as string | number);
    });
    document.head.appendChild(scriptElement);
  });
}
