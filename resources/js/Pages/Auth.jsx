import { useState } from 'react';
import Login from '../Components/Login';
import Register from '../Components/Register';
import VerifyCode from '../Components/VerifyCode';
import ForgotPassword from '../Components/ForgotPassword';

export default function Auth() {
    const [view, setView] = useState('login'); // 'login', 'register', 'verify', 'forgot'
    const [verifyEmail, setVerifyEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const handleRegisterSuccess = (email, code) => {
        setVerifyEmail(email);
        setVerificationCode(code);
        setView('verify');
    };

    return (
        <div style={styles.container}>
            {/* Анимированные волны */}
            <div style={styles.waves}>
                <div style={styles.wave}></div>
                <div style={{...styles.wave, ...styles.wave2}}></div>
                <div style={{...styles.wave, ...styles.wave3}}></div>
                <div style={{...styles.wave, ...styles.wave4}}></div>
                <div style={{...styles.wave, ...styles.wave5}}></div>
                <div style={{...styles.wave, ...styles.wave6}}></div>
            </div>
            
            <div style={styles.content}>
                {/* Логотип */}
                <div style={styles.logoContainer}>
                    <img 
                        src="/images/logo.jpg" 
                        alt="Логотип" 
                        style={styles.logo}
                        onError={(e) => {
                            // Если логотип не найден, скрываем его
                            e.target.style.display = 'none';
                        }}
                    />
                </div>

                {view === 'login' && (
                    <>
                        <Login />
                        <div style={styles.links}>
                            <button
                                type="button"
                                onClick={() => setView('register')}
                                style={styles.linkButton}
                            >
                                Нет аккаунта? Зарегистрироваться
                            </button>
                            <button
                                type="button"
                                onClick={() => setView('forgot')}
                                style={styles.linkButton}
                            >
                                Забыли пароль?
                            </button>
                        </div>
                    </>
                )}

                {view === 'register' && (
                    <>
                        <Register />
                        <div style={styles.links}>
                            <button
                                type="button"
                                onClick={() => setView('login')}
                                style={styles.linkButton}
                            >
                                Уже есть аккаунт? Войти
                            </button>
                        </div>
                    </>
                )}

                {view === 'verify' && (
                    <>
                        <VerifyCode email={verifyEmail} verificationCode={verificationCode} />
                        <div style={styles.links}>
                            <button
                                type="button"
                                onClick={() => setView('login')}
                                style={styles.linkButton}
                            >
                                Вернуться к входу
                            </button>
                        </div>
                    </>
                )}

                {view === 'forgot' && (
                    <>
                        <ForgotPassword />
                        <div style={styles.links}>
                            <button
                                type="button"
                                onClick={() => setView('login')}
                                style={styles.linkButton}
                            >
                                Вернуться к входу
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        // Белый фон с паттерном колибри
        background: `
            url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='hummingbird-pattern' x='0' y='0' width='0.25' height='0.25' patternUnits='objectBoundingBox'%3E%3Cg opacity='0.08'%3E%3Cpath fill='%2360a5fa' d='M50 45 C52 43,55 43,57 45 C59 47,59 50,57 52 C55 54,52 54,50 52 C48 50,48 47,50 45 M57 45 L59 43 M48 52 L45 50 M50 52 L48 48 M52 52 L54 48 M52 47 Q55 43,53 40 Q52 43,52 47 M48 47 Q45 43,47 40 Q48 43,48 47'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23hummingbird-pattern)'/%3E%3C/svg%3E"),
            #ffffff
        `,
        backgroundSize: '300px 300px, cover',
        backgroundPosition: 'center, center',
        backgroundAttachment: 'fixed, fixed',
    },
    waves: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
    },
    wave: {
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'rgba(249,168,212,0.4)',
        borderRadius: '50%',
        animation: 'waveMove 8s ease-in-out infinite',
        filter: 'blur(30px)',
        top: '10%',
        left: '8%',
    },
    wave2: {
        animation: 'waveMove 10s ease-in-out infinite',
        animationDelay: '-2s',
        background: 'rgba(167,139,250,0.4)',
        filter: 'blur(30px)',
        top: '70%',
        left: '78%',
    },
    wave3: {
        animation: 'waveMove 12s ease-in-out infinite',
        animationDelay: '-4s',
        background: 'rgba(96,165,250,0.4)',
        filter: 'blur(30px)',
        top: '50%',
        left: '50%',
    },
    wave4: {
        animation: 'waveMove 9s ease-in-out infinite',
        animationDelay: '-1s',
        background: 'rgba(249,168,212,0.35)',
        filter: 'blur(35px)',
        top: '3%',
        left: '65%',
        width: '450px',
        height: '450px',
    },
    wave5: {
        animation: 'waveMove 11s ease-in-out infinite',
        animationDelay: '-3s',
        background: 'rgba(96,165,250,0.35)',
        filter: 'blur(35px)',
        top: '80%',
        left: '12%',
        width: '450px',
        height: '450px',
    },
    wave6: {
        animation: 'waveMove 13s ease-in-out infinite',
        animationDelay: '-5s',
        background: 'rgba(167,139,250,0.35)',
        filter: 'blur(35px)',
        top: '20%',
        left: '88%',
        width: '450px',
        height: '450px',
    },
    content: {
        width: 'calc(100% - 40px)',
        maxWidth: '500px',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 60px rgba(96, 165, 250, 0.5), 0 0 100px rgba(147, 197, 253, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        padding: '40px 30px',
        position: 'relative',
        zIndex: 1,
        margin: '20px',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        maxWidth: '200px',
        maxHeight: '80px',
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
        display: 'block',
    },
    links: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
    },
    linkButton: {
        background: 'none',
        border: 'none',
        color: '#007bff',
        cursor: 'pointer',
        fontSize: '14px',
        textDecoration: 'underline',
        padding: '5px',
    },
};

