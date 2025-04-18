<script lang="ts">
  import { page } from '$app/state'
  import { DEPLOY_PRIME_URL } from './environmentVariables'
  interface Props {
    title?: string | undefined
    description?: string
    imageUrl?: string
    keywords?: string | undefined
    canonicalUrl?: string | undefined
  }

  let {
    title = undefined,
    description = 'The hub of the Beat Saber community: your guide to top-tier map recommendations and essential insights. Uncover a rich selection of curated maps and learn more about Beat Saber and its community through our articles to enhance your gaming experience.',
    imageUrl = '/beastsaber-logo-fullsize-square.jpg',
    keywords = undefined,
    canonicalUrl = undefined,
  }: Props = $props()

  const finalTitle = title != null ? title + ' - BeastSaber' : 'BeastSaber'

  const origin = DEPLOY_PRIME_URL || 'https://bsaber.com'

  let normalizedImage = $state(imageUrl)

  $effect(() => {
    if (normalizedImage && !normalizedImage.startsWith('http') && normalizedImage.startsWith('/')) {
      normalizedImage = origin + imageUrl
    } else if (
      normalizedImage &&
      !normalizedImage.startsWith('/') &&
      !normalizedImage.startsWith('http')
    ) {
      if (page.url.href.endsWith('/')) {
        normalizedImage = page.url.href + imageUrl
      } else {
        normalizedImage = page.url.href + '/' + imageUrl
      }
    }
  })
</script>

<svelte:head>
  <!-- Standard Meta Attributes-->
  <title>{finalTitle}</title>
  <meta name="description" content={description} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={origin + page.url.pathname} />
  <meta property="og:title" content={finalTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={normalizedImage} />

  <!-- Put the canonical URL - which should be a the full URL according to google -->
  <!-- Only put it down if we are not already on the conanical URL -->
  {#if canonicalUrl && canonicalUrl !== page.url.pathname}
    <link rel="canonical" href={origin + canonicalUrl} />
  {/if}

  <!-- fix incoming links from netlify emails -->
  <!-- fix incoming links from netlify emails -->
  <!-- fix incoming links from netlify emails -->
  <!-- fix incoming links from netlify emails -->
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</svelte:head>
