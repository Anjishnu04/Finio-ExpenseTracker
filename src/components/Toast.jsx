export default function Toast({ message, type }) {
  return (
    <div className={`toast show`} style={{
      borderColor: type === 'error' ? 'rgba(244,63,94,0.4)' : type === 'success' ? 'rgba(16,185,129,0.4)' : ''
    }}>
      {message}
    </div>
  );
}
