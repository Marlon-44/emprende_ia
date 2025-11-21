import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "./index.module.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MoreButton({general__info}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div className={styles.circle__question} onClick={handleOpen}>
                <img src="/assets/plus.svg" alt="" />
            </div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
                className={styles.modal}
            >
                <div className={styles.modal__card}>
                    <div className={styles.argollado}>
                        <div className={styles.circle__div}></div>
                        <div className={styles.circle__div}></div>
                        <div className={styles.circle__div}></div>
                        <div className={styles.circle__div}></div>
                        <div className={styles.circle__div}></div>
                    </div>
                    <div className={styles.importancia__info}>
                        <h2>Mas informacion</h2>
                    <p>{ general__info }</p>
                    </div>
                    
                </div>
            </Modal>
        </div>
    );
}
