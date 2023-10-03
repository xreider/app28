import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();

    const [isAuthModalOpened, setItAuthModalOpened] = useState(false)

    const onCloseModal = useCallback(() => { setItAuthModalOpened(prev => !prev) }, [])

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onCloseModal}
            >
                {t('Войти')}
            </Button>
            <LoginModal
                isOpen={isAuthModalOpened}
                onClose={() => setItAuthModalOpened(false)}
            />
        </div>
    );
};
