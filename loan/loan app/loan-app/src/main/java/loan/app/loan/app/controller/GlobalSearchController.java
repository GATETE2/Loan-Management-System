package loan.app.loan.app.controller;

import loan.app.loan.app.service.GlobalSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/search")
public class GlobalSearchController {
    @Autowired
    private GlobalSearchService globalSearchService;

    @GetMapping
    public Map<String, Object> search(@RequestParam String query) {
        return globalSearchService.search(query);
    }
} 