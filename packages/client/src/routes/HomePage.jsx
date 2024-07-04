import Button from '../components/Button';
import '../css/HomePage.css';

const HomePage = () => {

    return (
        <>
            <main className="home-main-container">
                <header>
                    <h1 className="home-title">
                        Quelle sera votre prochaine destination ?
                    </h1>
                </header>

                <section>
                <Button
                    label="Valider"
                    onClick={() => console.log('Je valide ma sélection')}
                />
                </section>
            </main>
        </>
    )
};

export default HomePage;