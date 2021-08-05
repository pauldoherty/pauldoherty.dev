---
title: Blog
layout: base.njk
templateEngineOverride: njk,md
---

<h2>{{ title }}</h2>

<p>Here you find random posts about my recent coding journey. I decided after 25 years in the industry it would be a good idea to start one of these, expect me to be on TikTok sometime around 2040.</p>

<div class="columns">
    {% include "postlist.njk" %}
</div>
