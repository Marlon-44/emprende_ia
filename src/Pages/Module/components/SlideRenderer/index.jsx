import CongratsSlide from "../slides/CongratsSlide";
import IntroSlide from "../slides/IntroSlide";
import LessonSlide from "../slides/LessonSlide";
import ObjectivesSlide from "../slides/ObjectivesSlide";
import QuizSlide from "../slides/QuizSlide";


const SlideRenderer = ({ slide = {}, course, onJump}) => {
    switch (slide.type) {
        case "intro":
            return <IntroSlide module={slide.data} onJump={onJump}/>;
        case "objectives":
            return <ObjectivesSlide objetivos={slide.data} titulo={course.titulo} />;
        case "lesson":
            return <LessonSlide slide={slide} />;
        case "congrats":
            return <CongratsSlide module={slide.data} />;
        case "quiz":
            return <QuizSlide questions={slide.data} />;
        default:
            return <div>Tipo desconocido</div>;
    }
};
export default SlideRenderer;