import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '../Components/Layout';

export default function Profile({ auth, user: initialUser, success }) {
    const [activeTab, setActiveTab] = useState('profile');
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const profileForm = useForm({
        name: initialUser.name,
        email: initialUser.email,
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.put('/profile');
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put('/profile/password', {
            onSuccess: () => {
                passwordForm.reset();
                setShowPasswordForm(false);
            },
        });
    };

    return (
        <>
            <Head title="Профиль" />
            <Layout auth={auth}>
                <div style={styles.container}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>Управление профилем</h1>
                        <Link href="/dashboard" style={styles.backLink}>
                            ← Назад в кабинет
                        </Link>
                    </div>

                    {success && (
                        <div style={styles.successMessage}>
                            {success}
                        </div>
                    )}

                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>Личная информация</h2>
                        <form onSubmit={submitProfile} style={styles.form}>
                            <div style={styles.field}>
                                <label style={styles.label}>Имя</label>
                                <input
                                    type="text"
                                    value={profileForm.data.name}
                                    onChange={(e) => profileForm.setData('name', e.target.value)}
                                    style={styles.input}
                                />
                                {profileForm.errors.name && (
                                    <div style={styles.error}>{profileForm.errors.name}</div>
                                )}
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Email</label>
                                <input
                                    type="email"
                                    value={profileForm.data.email}
                                    onChange={(e) => profileForm.setData('email', e.target.value)}
                                    style={styles.input}
                                />
                                {profileForm.errors.email && (
                                    <div style={styles.error}>{profileForm.errors.email}</div>
                                )}
                            </div>

                            <div style={styles.actions}>
                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    style={styles.submitButton}
                                >
                                    {profileForm.processing ? 'Сохранение...' : 'Сохранить изменения'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>Безопасность</h2>
                        {!showPasswordForm ? (
                            <div>
                                <p style={styles.cardText}>
                                    Измените пароль для защиты вашего аккаунта
                                </p>
                                <button
                                    onClick={() => setShowPasswordForm(true)}
                                    style={styles.changePasswordButton}
                                >
                                    Изменить пароль
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submitPassword} style={styles.form}>
                                <div style={styles.field}>
                                    <label style={styles.label}>Текущий пароль</label>
                                    <input
                                        type="password"
                                        value={passwordForm.data.current_password}
                                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                        style={styles.input}
                                    />
                                    {passwordForm.errors.current_password && (
                                        <div style={styles.error}>{passwordForm.errors.current_password}</div>
                                    )}
                                </div>

                                <div style={styles.field}>
                                    <label style={styles.label}>Новый пароль</label>
                                    <input
                                        type="password"
                                        value={passwordForm.data.password}
                                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                                        style={styles.input}
                                    />
                                    {passwordForm.errors.password && (
                                        <div style={styles.error}>{passwordForm.errors.password}</div>
                                    )}
                                </div>

                                <div style={styles.field}>
                                    <label style={styles.label}>Подтверждение пароля</label>
                                    <input
                                        type="password"
                                        value={passwordForm.data.password_confirmation}
                                        onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                        style={styles.input}
                                    />
                                    {passwordForm.errors.password_confirmation && (
                                        <div style={styles.error}>{passwordForm.errors.password_confirmation}</div>
                                    )}
                                </div>

                                <div style={styles.actions}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowPasswordForm(false);
                                            passwordForm.reset();
                                        }}
                                        style={styles.cancelButton}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={passwordForm.processing}
                                        style={styles.submitButton}
                                    >
                                        {passwordForm.processing ? 'Изменение...' : 'Изменить пароль'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '40px auto',
        padding: '0 20px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
    },
    title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#333',
        margin: 0,
    },
    backLink: {
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
    },
    successMessage: {
        padding: '15px 20px',
        backgroundColor: '#d4edda',
        color: '#155724',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '16px',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '30px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    cardTitle: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
        margin: '0 0 20px 0',
    },
    cardText: {
        fontSize: '16px',
        color: '#666',
        margin: '0 0 20px 0',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    field: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '16px',
        fontWeight: '500',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
    },
    error: {
        marginTop: '5px',
        fontSize: '14px',
        color: '#dc3545',
    },
    actions: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px',
    },
    submitButton: {
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    cancelButton: {
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
        backgroundColor: '#e9ecef',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    changePasswordButton: {
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#28a745',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
};

