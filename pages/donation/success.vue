<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-[#0e1222]"
  >
    <div
      class="bg-slate-950/30 backdrop-blur-lg border border-slate-900 p-8 rounded-lg shadow-lg text-center"
    >
      <Icon name="icon-park-solid:success" class="text-7xl text-green-700" />
      <h1 class="text-2xl text-green-700 font-bold mb-4">
        Payment Successful!
      </h1>
      <p class="text-gray-600 mb-6">
        Thank you for your payment. Your transaction was completed successfully.
      </p>
      <UButton to="/" label="Thanks !" />
    </div>
  </div>
</template>

<script></script>
