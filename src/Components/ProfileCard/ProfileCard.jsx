import styles from "./ProfileCard.module.css";
function ProfileCard({ title, content, footer,children }) {
    return (
        <div className={styles.container}>
            <p className={styles.title}>{title}</p>
            <h2 className={styles.content}>{content}</h2>
            <p className={styles.footer}>{footer}</p>
            {children}
        </div>
    );
}

export default ProfileCard;
