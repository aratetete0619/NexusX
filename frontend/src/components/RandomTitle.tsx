import styles from '../styles/RandomTitle.module.css';

const titles = [
  { text: "The early bird catches the worm.", image: "/random1.png" },
  { text: "L'habit ne fait pas le moine.", image: "/path/to/image2.jpg" },
  { text: "石の上にも三年", image: "/stone.jpg" },
  { text: "No hay mal que por bien no venga.", image: "/path/to/image4.jpg" },
  { text: "Aller Anfang ist schwer.", image: "/path/to/image5.jpg" },
  { text: "Chi dorme non piglia pesci.", image: "/path/to/image6.jpg" },
  { text: "Rome wasn't built in a day.", image: "/path/to/image7.jpg" },
  { text: "Après la pluie, le beau temps.", image: "/path/to/image8.jpg" },
  { text: "七転び八起き", image: "/path/to/image9.jpg" },
  { text: "Más vale tarde que nunca.", image: "/path/to/image10.jpg" }
];

const RandomTitle = () => {
  const randomIndex = Math.floor(Math.random() * titles.length);
  const { text, image } = titles[randomIndex];

  return (
    <div className={styles.titleContainer}>
      <img src={image} alt={text} className={styles.titleImage} />
      <h1 className={styles.titleText}>{text}</h1>
    </div>
  );
};

export default RandomTitle;
