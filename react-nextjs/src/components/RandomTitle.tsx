import styles from '../styles/RandomTitle.module.css';
import Image from 'next/image';

const titles = [
  { text: "A journey of a thousand miles begins with a single step.", image: "/random2.png" }, // Chinese proverb
  { text: "Chassez le naturel, il revient au galop.", image: "/random1.png" }, // French proverb
  { text: "石の上にも三年", image: "/stone.jpg" }, // Japanese proverb
  { text: "Dime con quién andas, y te diré quién eres.", image: "/path/to/image4.jpg" }, // Spanish proverb
  { text: "Wer rastet, der rostet.", image: "/path/to/image5.jpg" }, // German proverb
  { text: "Chi dorme non piglia pesci.", image: "/path/to/image6.jpg" }, // Italian proverb
  { text: "Rome wasn't built in a day.", image: "/path/to/image7.jpg" }, // English proverb
  { text: "Après la pluie, le beau temps.", image: "/path/to/image8.jpg" }, // French proverb
  { text: "한 오리에 두 번 놀아나지 않는다", image: "/path/to/image9.jpg" }, // Korean proverb
  { text: "De grão em grão a galinha enche o papo.", image: "/path/to/image10.jpg" },// Portuguese proverb
  { text: "千里之行，始於足下", image: "/random2.png" }　//Chinese proverb
];

const RandomTitle = () => {
  const randomIndex = Math.floor(Math.random() * titles.length);
  const { text, image } = titles[randomIndex];

  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.titleText}>{text}</h1>
    </div>
  );
};

export default RandomTitle;
