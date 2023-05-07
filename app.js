const connectButton = document.getElementById("connect-button");
const sendButton = document.getElementById("send-button");
const input = document.getElementById("input");

connectButton.addEventListener("click", async () => {
  await window.solana.connect();
});

sendButton.addEventListener("click", async () => {
  const amount = input.value;
  const publicKey = await window.solana.publicKey();
  const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"), "confirmed");
  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: "Set Contract Address",
      lamports: solanaWeb3.LAMPORTS_PER_SOL * amount,
    })
  );
  const signature = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [window.solana]);
  alert(`Transaction ${signature} completed!`);
});
