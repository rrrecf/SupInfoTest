export interface Meme {
  image: File | null;
  topText: string;
  bottomText: string;
  fontSize: number;
  textColor: string;
  topTextPosition: { x: number; y: number };
  bottomTextPosition: { x: number; y: number };
}