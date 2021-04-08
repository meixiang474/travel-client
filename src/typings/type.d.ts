declare namespace React {
  export default any;
}

declare namespace SSR {
  export default boolean;
}

declare module "*.jpeg" {
  const type: string;
  export default type;
}

declare module "*.webp" {
  const type: string;
  export default type;
}
