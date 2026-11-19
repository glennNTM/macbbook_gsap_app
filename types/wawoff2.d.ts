declare module "wawoff2" {
  const wawoff2: {
    compress(input: Uint8Array): Promise<Uint8Array>;
    decompress(input: Uint8Array): Promise<Uint8Array>;
  };
  export default wawoff2;
}
