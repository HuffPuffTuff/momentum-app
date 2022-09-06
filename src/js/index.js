import Post from './post';
import quotes from '../assets/quotes.json';
import '../css/style.css';
import '../css/owfont-regular.css';
import logo from '../assets/img/second-bg.jpg';

const post = new Post('Webpack Post Title', logo);

console.log('Post to String:', post.toString());
console.log('JSON: ', quotes);