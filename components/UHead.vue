<script setup>
const props = defineProps({
    name: String,
    description: String,
    image: String,
    type: {
        type: String,
        default: "website",
    },
});

const title = computed(() => {
    if (!props.name) {
        return "Evermuzic | Ad Free Music Streaming";
    }

    return `${props.name} | Evermuzic`;
});
</script>

<template>
    <Head>
        <Title>{{ title }}</Title>
        <Meta name="description" :content="description" />
        <Meta property="og:title" :content="title" />
        <Meta property="og:description" :content="description" />
        <Meta property="og:image" :content="image" />
        <Meta property="og:type" :content="type" />
        <Meta property="og:url" :content="$route.fullPath" />
        <Meta name="twitter:title" :content="title" />
        <Meta name="twitter:description" :content="description" />
        <Meta name="twitter:image" :content="image" />
    </Head>
</template>
