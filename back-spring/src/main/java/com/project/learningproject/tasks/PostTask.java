package com.project.learningproject.tasks;

import com.project.learningproject.entities.Post;
import com.project.learningproject.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Component
public class PostTask {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private PostService postService;
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Value("${quote.api.key}")
    private String apiKey;



    // every 30 sec "*/30 * * * * ?"
    // every 30 min "* */30 * * * ?"
    @Scheduled(cron = "0 */30 * * * ?")
    public void reportCurrentTime() {
        System.out.println("The time is now " + dateFormat.format(new Date()));

        try {

            // Request Header
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("X-Api-Key", apiKey);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            String apiUrl = "https://api.api-ninjas.com/v1/quotes"; // Replace with your API URL
            var response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, List.class);

            if(Objects.requireNonNull(response.getBody()).isEmpty()) {
                throw new Exception("No data received");
            }
            Map<String,String> quote = (Map<String, String>) response.getBody().get(0);
            System.out.println("HTTP Response: " + quote.get("quote"));

            var post = Post.builder()
                    .title(quote.get("category") + " - " + quote.get("author"))
                    .body(quote.get("quote"))
                    .createdBy(1L)
                    .build();

            postService.save(post);

        }catch (Exception ex){
            System.out.println("HTTP Response: " + ex.getMessage());

        }
    }

}
