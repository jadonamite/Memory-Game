const { renderToString } = require("react-dom/server");
const React = require("react");

const FrameImage = ({ state }) => {
   const { cards, flipped, matched, cursor } = state;
   return (
      <div
         style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "5px",
            padding: "10px",
            background: "#000",
         }}>
         {cards.map((card, index) => (
            <div
               key={index}
               style={{
                  width: "60px",
                  height: "60px",
                  background: matched[index]
                     ? "#4caf50"
                     : flipped[index]
                     ? "#fff"
                     : "#666",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border:
                     index === cursor ? "3px solid #ff0" : "2px solid #fff",
                  color: matched[index] || flipped[index] ? "#000" : "#fff",
                  fontSize: "18px",
                  fontFamily: "Arial",
               }}>
               {matched[index] || flipped[index] ? card : "?"}
            </div>
         ))}
      </div>
   );
};

module.exports = (req, res) => {
   const state = JSON.parse(decodeURIComponent(req.query.state || "{}"));
   const html = renderToString(React.createElement(FrameImage, { state }));
   res.setHeader("Content-Type", "text/html");
   res.send(`<!DOCTYPE html><html><body>${html}</body></html>`);
};
