export default function HostPlayerBubble({ player, pageType }) {
  if (pageType == "hostWaiting") {
    return (
      <div class="card w-40 bg-neutral text-neutral-content">
        <div class="card-body items-center text-center">
          <p>{player}</p>
        </div>
      </div>
    );
  }
}