type ServiceCardProps = {
  name: string;
  status: "online" | "offline";
};

export function ServiceCard({
  name,
  status,
}: ServiceCardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>Status: {status}</p>
    </article>
  );
}