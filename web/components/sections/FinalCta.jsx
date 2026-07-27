import Reveal from "../Reveal";
import { site } from "@/lib/config";

export default function FinalCta() {
  return (
    <section className="section center" style={{ padding: "120px 0" }}>
      <Reveal className="container narrow" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
        <h2 className="h2">
          Время не вернуть.<br />Но можно перестать его терять.
        </h2>
        <a className="btn btn-primary" href={site.paymentUrl} style={{ fontSize: 17, padding: "17px 32px" }}>
          Занять место — {site.price}
        </a>
      </Reveal>
    </section>
  );
}
